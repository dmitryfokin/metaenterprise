'use strict';

class MasterDataRef {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'masterdataref',
    };
  }
}

module.exports = { MasterDataRef }
