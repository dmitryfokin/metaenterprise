'use strict';

const { SystemDataManager } = require("./systemDataManager.js");
const path = require('path');
const { hasSubscribers } = require("diagnostics_channel");


class SystemData {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'systemData',
      name: 'systemData',
      systemFields: this.getSystemFields(),
      prefixTable: 'systemData',
    };
    this.items = new Map();
  }

  async init() {
    const e = this.metadata.enterprise;
    this.initBefor();

    if (e.dbInitialized) {
      // await e.loadMetadataFromDB('schemas');
      await e.loadMetadataFromFiles(path.join(e.root, 'data', 'schemas'));
    } else {
      await e.loadMetadataFromFiles(path.join(e.root, 'data', 'schemas'));
    }

    // for (const [key, value] of this.systemData.items) {
    //   value.init();
    // }
    this.initAfter();
  }

  async initBefor() {
  }

  async initAfter() {
  }

  set(nameSchema, exports) {
    this.items.set(nameSchema, new SystemDataManager(this.metadata.enterprise, exports));
    if (!this[nameSchema]) {
      Object.defineProperty(this, nameSchema, {
        get() { return this.items.get(nameSchema) },
      });
    };
  }

  get(nameSchema) {
    return this.items.get(nameSchema);
  }

  getSystemFields() {
    const systemFields = new Map();
    systemFields.set('ref', { name: 'ref' });
    systemFields.set('recordVersion', { name: 'recordVersion' });
    systemFields.set('createdAt', { name: 'createdAt' });
    systemFields.set('updatedAt', { name: 'updatedAt' });
    // TODO: добавить полное описание полей
    return systemFields;
  }

  // async getRefShot(data = {}) {
  //   if (!data.kind) return undefined;
  //   const parseKind = data.kind.split('/');
  //   if (!this[parseKind[1]]) return undefined;

  // }

  sqlCreateDBTable(nameSchema) {
    if (!this.items.has(nameSchema)) return;
    const schema = this.items.get(nameSchema).metadata;
    const tableName = schema.tableName;
    const fields = schema.fields;
    const subTables = schema.subTables || new Map();

    const resFields = {
      sqlScriptCreateTableFields: [],
      sqlScriptCreateFunctions: [],
      sqlScriptCreateFunctionsFieldsList: [],
      sqlScriptCreateForeignKey: [],
    }

    const res = {
      sqlScriptCreateTable: '',
      sqlScriptCreateFunctions: '',
      sqlScriptCreateForeignKey: '',
    };

    for (const field of Array.from(fields.values())) {
      resFields.sqlScriptCreateTableFields.push(field.generateSQLCreateField());
      resFields.sqlScriptCreateFunctions.push(field.generateSQLFunctionParam());
      resFields.sqlScriptCreateFunctionsFieldsList.push(field.generateSQLName());

      if (field.isRef)
        resFields.sqlScriptCreateForeignKey.push(
          `
          ALTER TABLE "${tableName}" ADD CONSTRAINT "fk_${tableName}_${field.name}"
            ${field.generateSQLForeignKey()};
          `
        );
    };

    res.sqlScriptCreateTable = `
    CREATE TABLE "${tableName}" (
    "ref" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "recordVersion" integer NOT NULL DEFAULT 1,
    ${resFields.sqlScriptCreateTableFields.join(',')},
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW() 
    );
    
    CREATE TRIGGER "setTimestamp_${tableName}"
    BEFORE UPDATE ON "${tableName}"
    FOR EACH ROW
    EXECUTE PROCEDURE "triggerSetTimestamp"();

    `;

    res.sqlScriptCreateFunctions = `
      CREATE OR REPLACE FUNCTION  "${tableName}_insert"(${resFields.sqlScriptCreateFunctions.join(', ')})
      RETURNS "${tableName}" AS $$
      INSERT INTO "${tableName}" (${resFields.sqlScriptCreateFunctionsFieldsList.join(',')}) VALUES (${resFields.sqlScriptCreateFunctionsFieldsList.join(',')}) RETURNING *;
      $$ LANGUAGE sql;
      `;

    res.sqlScriptCreateForeignKey = resFields.sqlScriptCreateForeignKey.join('');

    for (const subTable of Array.from(subTables.values())) {
      const resSubTables = this.sqlCreateDBSubTable(subTable.metadata.name, schema);
      res.sqlScriptCreateForeignKey += resSubTables.sqlScriptCreateForeignKey;
      res.sqlScriptCreateTable += resSubTables.sqlScriptCreateTable;
    };
    return res;
  }


  sqlCreateDBSubTable(nameSchema, parent) {
    if (!parent.subTables.has(nameSchema)) return;
    const schema = parent.subTables.get(nameSchema).metadata;
    const { tableName, fields } = schema;
    const resFields = {
      sqlScriptCreateTableFields: [],
      sqlScriptCreateForeignKey: [],
    }
    const res = {
      sqlScriptCreateTable: '',
      sqlScriptCreateForeignKey: '',
    };

    for (const field of Array.from(fields.values())) {
      resFields.sqlScriptCreateTableFields.push(field.generateSQLCreateField());
      if (field.isRef)
        resFields.sqlScriptCreateForeignKey.push(
          `
          ALTER TABLE "${tableName}" ADD CONSTRAINT "fk_${tableName}_${field.name}"
            ${field.generateSQLForeignKey()};
          `
        );
    };

    res.sqlScriptCreateTable = `
    CREATE TABLE "${tableName}" (
      "ref" uuid REFERENCES "${parent.tableName}"(ref),
      "rowNumber" integer NOT NULL,
      ${resFields.sqlScriptCreateTableFields.join(',')},
      PRIMARY KEY ("ref", "rowNumber")
    );

    `;

    res.sqlScriptCreateForeignKey = resFields.sqlScriptCreateForeignKey.join('');

    return res;
  }


  sqlCreateDBStructure() {
    const createTables = [];
    const createFunctions = [];
    const createForeignKey = [];

    for (const schemaName of Array.from(this.items.keys())) {
      const res = this.sqlCreateDBTable(schemaName);

      createTables.push(res.sqlScriptCreateTable);
      createFunctions.push(res.sqlScriptCreateFunctions);
      if (res.sqlScriptCreateForeignKey !== '')
        createForeignKey.push(res.sqlScriptCreateForeignKey);
    }

    const query = [
      {
        kind: 'query',
        query: createTables.join(''),
        values: [],
      },
      {
        kind: 'query',
        query: createFunctions.join(''),
        values: [],
      },
      {
        kind: 'query',
        query: createForeignKey.join(''),
        values: [],
      },
    ];


    return query;
  }

  sqlDropDBStructure() {
    const query = [];
    for (const schemaName of Array.from(this.items.keys())) {
      query.push({
        kind: 'query',
        query: `
          DROP TABLE "systemData_${schemaName}" CASCADE;
    `,
        values: [],
      });
      const schema = this.items.get(schemaName);
      // for (const subtableName of Array.from(schema.metadata.subTables.keys())) {
      //   query.push({
      //     kind: 'query',
      //     query: `
      //       DROP TABLE "systemData_${schemaName}_${subtableName}" CASCADE;
      //       `,
      //     // DROP FUNCTION "systemData_${schemaName}_insert" CASCADE;
      //     values: [],
      //   });
      // };
    };
    return query;
  }

  sqlInsert(obj) {
    // TODO: прямой запрос, если получится сохранять через pg функцию, то эта не нужна
    const { fields } = obj.metadata.systemDataManager.metadata;
    const columns = [];
    const values = [];
    let i = 1;
    for (const value of fields.values()) {
      columns.push(`"${value.name}" => $${i++}`);
      values.push(obj[value.name]);
    };
    const query = [
      {
        kind: 'query',
        query: `SELECT * FROM "systemData_${obj.metadata.name}_insert"(${columns.join(',')});`,
        values: values,
      },
    ];
    return query;
  }

  sqlGetById(schemaName, id) {
    const query = [
      {
        kind: 'query',
        query: `SELECT * FROM "systemData_${schemaName}" WHERE "ref" = $1;`,
        values: [id],
      },
    ];
    return query;
  }

  sqlGetByAttr(schemaName, attrName, value) {
    const query = [
      {
        kind: 'query',
        query: `SELECT * FROM "systemData_${schemaName}" WHERE "${attrName}" = $1;`,
        values: [value],
      },
    ];
    return query;
  }

  sqlPerformanceJOIN(name, postfix = '') {
    if (!this.items.has(name)) return;
    const metadata = this.items.get(name).metadata;
    const sqlScriptField = `
      t${postfix}.  
    `;
    const sqlScriptJoin = `
      JOIN weather w2  
    `;

    return { field: sqlScriptField, join: sqlScriptJoin };
  }

}

module.exports = { SystemData }
