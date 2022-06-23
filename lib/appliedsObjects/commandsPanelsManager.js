'use strict';

class СommandsPanelsManager {
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

module.exports = { СommandsPanelsManager }
