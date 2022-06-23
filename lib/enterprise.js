'use strict';

const metavm = require('metavm');

const { MasterDataManager } = require("./appliedsObjects/masterDataManager.js");
const { СommandsPanelsManager } = require("./appliedsObjects/commandsPanelsManager.js");
const { DataHandlersManager } = require("./appliedsObjects/dataHandlersManager.js");
const { enterpriseTypes } = require("./contracts/types.js");
const { MetaformAdapter } = require("./metaform/metaformAdapter");
const { SystemActions } = require("./systemActions/systemActions.js");
const { SystemData } = require("./appliedsObjects/systemData.js");
const { Database } = require('metaenterprise/lib/db/database.js');


class Enterprise {
  constructor(application) {
    this.metadata = {
      kind: 'enterprise',
      path: 'enterprise',
      help: {},
    };

    this.application = application;
    console = application.sandbox.console;

    // TODO: добавить кастомный конфиг для enterprase
    const options = { ...this.application.config.database, console };
    this.db = new Database(options);

    this.systemData = new SystemData(this); // Системные данные
    this.metadata.systemData = this.systemData.metadata;

    this.appAdapter = new MetaformAdapter(this); // ? TODO: не уверен, что тут должен торчать адаптер

    this.systemActions = new SystemActions(this); // Системные вызовы
    this.metadata.systemActions = this.systemActions.metadata;

    this.masterData = new MasterDataManager(this); // Мастерданные
    this.metadata.masterData = this.masterData.metadata;

    //operations: new Map(), // Операции

    this.commandsPanels = new СommandsPanelsManager(this); // Панели комманд и меню
    this.metadata.commandsPanels = this.commandsPanels.metadata;

    this.dataHandler = new DataHandlersManager(this); // Обработчики данных
    this.metadata.dataHandler = this.dataHandler.metadata;

    this.preloadFiles = [];
  }

  async init() {
    // Инициализация Metaenterprise
    // . Проверка подключения БД
    // . Инициализация и проверка системных таблиц (systemData)
    // . Инициализация и проверка таблиц приложения
    // . 
    // . 
    if (!await this.db.connected()) return; // TODO: сформировать ошибку подключения к БД
    this.tablesDB = await this.db.getTables();
    await this.loadMetadata();
    // await this.loadMetadata(`${this.application.root}/node_modules/metaenterprise/data/schemas`);
    // this.systemData.init();
    // console.dir(this.preloadFiles);
  }

  static async load({ application }) {
    const enterprise = new Enterprise(application);
    application.sandbox.application.enterprise = enterprise;

    await enterprise.init();
  }

  async processorData({ action }) {
    const path = action.name.split('/');
    if (!!this[path[0]] && this[path[0]][path[1]])
      return await this[path[0]].run({ action });
  }

  async loadMetadata() {
    //if (!this.checkEnterpriseStructurDB()) loadMetadataEmptyEnterpriseDB();
    this.systemActions.init(!this.checkEnterpriseStructurDB());
    // await this.systemActions.run({action: {
    //   name: 'systemActions/dropDBStructure',
    // }});
    // await this.systemActions.run({action: {
    //   name: 'systemActions/initDBStructure',
    // }});
    
  }
  
  // async loadMetadataEmptyEnterpriseDB() {
     
  // }
  
  checkEnterpriseStructurDB() {
    return this.tablesDB.has('systemData_Enterprise') && this.tablesDB.has('systemData_Schemas')
  }
  
  async loadMetadataFromFiles(pathDir) {
    // // TODO: отслеживать ошибку повторной загрузки метаданных
    // const files = await this.application.sandbox.node.fsp.readdir(pathDir, { withFileTypes: true });
    // await Promise.all(Array.from(files).map(file => new Promise(async resolve => {
    //   const absPath = this.application.sandbox.node.path.join(pathDir, file.name);
    //   if (file.isDirectory()) {
    //     await this.loadMetadata(absPath);
    //     resolve();
    //   } else {
    //     if (file.name.endsWith('.js')) {
    //       const scriptVM = await metavm.readScript(absPath);
    //       if (!scriptVM.exports) return resolve();
    //       if (!scriptVM.exports.metadata) return resolve();
    //       const typeMetadata = scriptVM.exports.metadata.type.split('/');
    //       if (typeMetadata[0]!=='enterprise') return resolve();
    //       if (typeMetadata.length === 1) {
    //         // TODO: Заполнить this.matadata
    //         this.preloadFiles.push(scriptVM);
    //       } else {
    //         if (!this[typeMetadata[1]]) return resolve();
    //         this[typeMetadata[1]].set(scriptVM.exports.metadata.name, scriptVM.exports);
    //         this.preloadFiles.push(scriptVM);
    //       };
    //     };
    //     resolve();
    //   };
    // })));
  }
}

module.exports = { Enterprise }
