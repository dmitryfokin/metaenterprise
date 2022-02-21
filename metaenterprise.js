'use strict';

const MasterData = require('./lib/appliedsObjects/masterData.js');
const Database = require('./lib/db/database.js');

module.exports = { ...MasterData, ...Database }
