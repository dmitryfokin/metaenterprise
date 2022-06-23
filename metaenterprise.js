'use strict';

const EStatic = require('./lib/EStatic.js');
const Enterprise = require('./lib/enterprise.js');
const Database = require('./lib/db/database');
const authProvider = require('./lib/auth/authProvider.js');

module.exports = {
  ...Enterprise,
  ...EStatic,
  ...Database,
  plugins: { authProvider },
}
