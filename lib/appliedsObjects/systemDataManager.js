'use strict';

const { Field } = require("./field.js");

const reservedFields = [
  'Ref',
  'createdAt',
  'updatedAt',
];


class SystemDataManager {
  constructor(enterprise, exports) {
    this.metadata = {
      enterprise,
      kind: 'systemdatamanager',
      // TODO: обработать exports, вытянуть поля, формы, макеты и тп
      exports: exports,
      fields: new Map(),
      subtables: new Map(),
      forms: new Map(),
    };

    for (const field of exports.fields) {
      // TODO: проверить зарезервированные поля (Ref, createdAt, updatedAt)
      this.fields.set(field.name, new Field(field));
    };
  }

  async init() {
  }

  async create() {

  }

  async emptyLink() {

  }

  async getLinkById(id) {

  }

  async getShotLinkById(id) {

  }

  async getObjById(id) {

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
