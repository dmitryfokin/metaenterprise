'use strict';

class SystemDataSelection {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'systemdataselection',
    };
  }
}

module.exports = { SystemDataSelection }
