'use strict';

// const path = require('path');

class SystemTypes {
  constructor(enterprise) {
    this.metadata = {
      enterprise: enterprise,
      kind: 'systemTypes',
    };
    this.items = new Map();
    this.refKind = [
      'systemData',
      'masterData',
      'operation',
    ];
  }

  isRef(type) {
    const parsedType = this.parseType(type);
    return (parsedType[0] === 'me#' && this.refKind.includes(parsedType[1]));
  }

  parseType(type) {
    return type.split('/');
  }

  get(nameType) {
    return this.items.get(nameType);
  }

  set(nameType, value) {
    this.items.set(nameType, value);
  }
}

module.exports = { SystemTypes }
