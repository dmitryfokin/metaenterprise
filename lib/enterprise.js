'use strict';

const { MasterDataManager } = require("./appliedsObjects/masterDataManager.js");
const { enterpriseTypes } = require("./contracts/types.js");

const readMetaschema = (name, schema, preloadESchemas) => {
  if (!schema.fields) return;
  if (!schema.fields.metadata) return;
  if (!schema.fields.metadata.type) return;

  const type = schema.fields.metadata.type;
  if (!enterpriseTypes.includes(type)) return;

  if (!preloadESchemas[type]) preloadESchemas[type] = new Map();
  preloadESchemas[type].set(name, { type, name });
}

class Enterprise {
  constructor(model) {
    this.metadata = {
      kind: 'enterprise',
      path: 'enterprise',
      help: {},
      masterData: new MasterDataManager(),
      operations: new Map(),
    };
  }

  static load({ model, domain, npm, config, application }) {

    const preloadESchemas = {};
    for (const [name, schema] of model.entities) {
      readMetaschema(name, schema, preloadESchemas);
    }



    const enterprise = new Enterprise();
    domain.enterprise = enterprise;
    domain.masterData = enterprise.metadata.masterData;
    domain.operations = enterprise.metadata.operations;
  }


}

module.exports = { Enterprise }
