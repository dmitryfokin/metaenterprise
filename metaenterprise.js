'use strict';

const EStatic = require('metaenterprise/lib/EStatic');
const Enterpris = require('./lib/enterprise.js');

module.exports = {
  ...Enterpris,
  ...EStatic, 
}
