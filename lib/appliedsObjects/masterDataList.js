'use strict';

class MasterDataList {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'masterdatalist',
    };
  }
}

module.exports = { MasterDataList }
