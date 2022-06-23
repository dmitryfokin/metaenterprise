'use strict';

class SystemDataList {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'systemdatalist',
    };
  }
}

module.exports = { SystemDataList }
