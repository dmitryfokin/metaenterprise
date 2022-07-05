'use strict';

const { SystemDataObj } = require("./systemDataObj.js");
const { Field } = require("./field.js");
const { SystemDataRef } = require("metaenterprise/lib/appliedsObjects/systemDataRef.js");

class SystemDataManager {
  constructor(enterprise, exports) {
    this.metadata = {
      enterprise,
      kind: 'systemDataManager',
      name: exports.metadata.name,
      systemData: enterprise.systemData,
      // TODO: обработать exports, вытянуть поля, формы, макеты и тп
      exports: exports,
      fields: new Map(),
      subTables: new Map(),
      forms: new Map(),
      hooks: new Map(),
      hashFile: exports.hashFile,
    };

    const { fields, hooks } = exports.metadata;
    for (const key in fields) {
      // TODO: проверить зарезервированные поля (Ref, createdAt, updatedAt)
      const field = new Field(this, fields[key]);
      this.metadata.fields.set(field.name, field);

      if (field.isRef) {
        this.metadata.enterprise.preloadSchemasData.push(field);
      }
    };
    // this.metadata.hooks.set('beforeSave', hooks.beforeSave);
    // this.metadata.hooks.set('afterSave', hooks.afterSave);
  }

  async init() {
  }

  async create() {
    const obj = new SystemDataObj(this);
    return obj;
  }

  async emptyLink() {

  }

  async getLinkById(id) {

  }

  async getShotLinkById(id) {

  }

  async getObjById(id) {

  }

  async getLinkByAttr(attrName, value) {
    const query = this.metadata.systemData.sqlGetByAttr(this.metadata.name, attrName, value);
    const res = await this.metadata.enterprise.db.query(query[0].query, query[0].values);
    const link = new SystemDataRef(this, res.rows[0]);
    return link;
  }

  async select() {

  }

  async getForm(name) {

  }

  async getFormObj() {

  }

  async getFormList() {

  }



}

module.exports = { SystemDataManager }
