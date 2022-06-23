'use strict';

class MasterDataSelection {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'masterdataselection',
    };
  }
}

module.exports = { MasterDataSelection }
