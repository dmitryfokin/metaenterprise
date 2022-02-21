'use strict';

const MasterDataManager = require('./lib/appliedsObjects/masterDataManager.js');
const MasterData = require('./lib/appliedsObjects/masterData.js');
const Database = require('./lib/db/database.js');

module.exports = { 
  ...MasterDataManager, 
  ...MasterData,
  ...Database, 
}
