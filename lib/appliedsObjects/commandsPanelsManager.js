'use strict';

class СommandsPanelsManager {
  constructor() {
    this.kind = 'commandspanelsmanager';
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
