'use strict';

const { SystemDataObj } = require("./systemDataObj.js");
const { Field } = require("./field.js");
const { SystemDataRef } = require("metaenterprise/lib/appliedsObjects/systemDataRef.js");

class SystemDataManager {
  constructor(enterprise, exports) {
    this.metadata = {
      enterprise,
      kind: 'systemdatamanager',
      name: exports.metadata.name,
      systemData: enterprise.systemData,
      // TODO: обработать exports, вытянуть поля, формы, макеты и тп
      exports: exports,
      fields: new Map(),
      subtables: new Map(),
      forms: new Map(),
      hooks: new Map(),
      hashFile: exports.hashFile,
    };

    const {fields, hooks} = exports.metadata;
    for (const field in fields) {
      // TODO: проверить зарезервированные поля (Ref, createdAt, updatedAt)
      this.metadata.fields.set(fields[field].name, new Field(fields[field]));
    };
    this.metadata.hooks.set('beforeSave', hooks.beforeSave);
    this.metadata.hooks.set('afterSave', hooks.afterSave);
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
