'use strict';

class MasterData {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'masterdata',
    };
  }
}

module.exports = { MasterData }
