'use strict';

class –°ommandsPanelsManager {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'commandspanelsmanager',
    };
    this.systemPanels = {};
  }

  getApplicationMenu() {
    return {
      items:[
        {name: 'dev'},
        {name: 'mdev'},
      ]
    }
  }
}

module.exports = { –°ommandsPanelsManager }
