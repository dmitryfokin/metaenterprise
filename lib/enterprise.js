'use strict';

const { FormManagerServer } = require("metaform");


const { MasterDataManager } = require("./appliedsObjects/masterDataManager.js");
const { СommandsPanelsManager } = require("./appliedsObjects/commandsPanelsManager.js");
const { DataHandlersManager } = require("./appliedsObjects/dataHandlersManager.js");
const { enterpriseTypes } = require("./contracts/types.js");
const { MetaformAdapter } = require("metaenterprise/lib/metaform/metaformAdapter");

// const readMetaschema = (name, schema, preloadESchemas) => {
//   // if (!schema.fields) return;
//   // if (!schema.fields.metadata) return;
//   // if (!schema.fields.metadata.type) return;

//   // const type = schema.fields.metadata.type;
//   // if (!enterpriseTypes.includes(type)) return;

//   // if (!preloadESchemas[type]) preloadESchemas[type] = new Map();
//   // preloadESchemas[type].set(name, { type, name });
// }

class Enterprise {
  constructor() {
    this.metadata = {
      kind: 'enterprise',
      path: 'enterprise',
      help: {},
      masterData: new MasterDataManager(), // Мастерданные
      operations: new Map(), // Операции
      commandsPanels: new СommandsPanelsManager(), // Панели комманд и меню
      dataHandler: new DataHandlersManager(), // Обработчики данных
    };
    this.appAdapter = new MetaformAdapter(this);
  }

  static load({ application }) {

    // const preloadESchemas = {};
    // for (const [name, schema] of model.entities) {
    //   readMetaschema(name, schema, preloadESchemas);
    // }

    application.sandbox.application.enterprise = new Enterprise();
    // domain.enterprise = enterprise;
    // domain.masterData = enterprise.metadata.masterData;
    // domain.operations = enterprise.metadata.operations;
    // application.sandbox.application.formManagerServer = new FormManagerServer(
    //   application.sandbox.application.enterprise.appAdapter,
    // );
  }

  getFormManagerServer(context) { 
    context.formManagerServer = new FormManagerServer(
      this.appAdapter,
    );
  }


}

module.exports = { Enterprise }
