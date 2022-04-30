'use strict';

const EStatic = require('./lib/EStatic.js');
const Enterprise = require('./lib/enterprise.js');
const Database = require('./lib/db/database');

module.exports = {
  ...Enterprise,
  ...EStatic,
  ...Database,
}
