'use strict';

class MasterDataManager {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'masterdatamanager',
    };
  }
}

module.exports = { MasterDataManager }
