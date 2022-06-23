'use strict';

class SystemDataRef {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'systemdataref',
    };
  }
}

module.exports = { SystemDataRef }
