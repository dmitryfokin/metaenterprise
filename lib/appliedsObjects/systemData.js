'use strict';

const { SystemDataManager } = require("./systemDataManager.js");
const path = require('path');


class SystemData {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'systemdata',
      systemFields: this.getSystemFields(),
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

  sqlCreateDBTable(nameSchema) {
    if (!this.items.has(nameSchema)) return;
    const { name, fields } = this.items.get(nameSchema).metadata;

    const sqlScriptFields = Array.from(fields).map(field => {
      const sqlScriptField = field[1].generateSQLCreateField();
      return sqlScriptField;
    }).join(',') + ',';

    const sqlScript = `
    CREATE TABLE "systemData_${name}" (
    "ref" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "recordVersion" integer NOT NULL DEFAULT 1,
    ${sqlScriptFields}
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW() 
    );
    
    CREATE TRIGGER "setTimestamp_systemData_${name}"
    BEFORE UPDATE ON "systemData_${name}"
    FOR EACH ROW
    EXECUTE PROCEDURE "triggerSetTimestamp"();
    `;
    return sqlScript;
  }

  sqlCreateDBStructure() {
    const query = Array.from(this.items.keys())
      .map(schemaName => {
        return {
          kind: 'query',
          query: this.sqlCreateDBTable(schemaName),
          values: [],
        }
      });
    return query;
  }

  sqlDropDBStructure() {
    const listNameTables = Array.from(this.items.keys())
      .map(schemaName => `"systemData_${schemaName}"`)
      .join(',');
    const query = [
      {
        kind: 'query',
        query: `DROP TABLE ${listNameTables} CASCADE;`,
        values: [],
      },
    ];
    return query;
  }

  sqlInsert(obj) {
    const { fields } = obj.metadata.systemDataManager.metadata;
    const columns = [];
    const values = [];
    const nums = [];
    let i = 1;
    for (const value of fields.values()) {
      columns.push(`"${value.name}"`);
      values.push(obj[value.name]);
      nums.push(`$${i++}`);
    };
    const query = [
      {
        kind: 'query',
        query: `INSERT INTO "systemData_${obj.metadata.name}" (${columns.join(',')}) VALUES (${nums.join(',')});`,
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
