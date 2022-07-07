'use strict';

// const { SystemDataObj } = require("./systemDataObj.js");
const { Field } = require("./field.js");
// const { SystemDataRef } = require("metaenterprise/lib/appliedsObjects/systemDataRef.js");

class SubTable {
  constructor(parent, schema) {
    const e = parent.metadata.enterprise;
    this.metadata = {
      enterprise: e,
      kind: 'subTable',
      name: schema.metadata.name,
      tableName: schema.metadata.tableName
        || `${e.systemData.metadata.prefixTable}_${parent.metadata.name}_${schema.metadata.name}`,
      systemData: e.systemData,
      // TODO: обработать exports, вытянуть поля, формы, макеты и тп
      fields: new Map(),
      hooks: new Map(),
    };
    this.init(schema);
  }

  async init(exports) {
    const { fields } = exports.metadata;
    for (const key in fields) {
      // TODO: проверить зарезервированные поля (Ref, createdAt, updatedAt)
      const field = new Field(this, fields[key]);
      this.metadata.fields.set(field.name, field);

      if (field.isRef) {
        this.metadata.enterprise.preloadSchemasData.push(field);
      };
    };
  }
}

module.exports = { SubTable }
