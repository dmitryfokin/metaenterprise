'use strict';

class DataHandlersManager {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'datahandlersmanager',
    };
  }
}

module.exports = { DataHandlersManager }

