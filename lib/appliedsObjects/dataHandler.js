'use strict';

class DataHandler {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'datahandler',
    };
  }
}

module.exports = { DataHandler }

