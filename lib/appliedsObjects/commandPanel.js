'use strict';

class СommandPanel {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'commandpanel',
    };
    this.systemPanels = {};
  }

  getMainMenu() {
    return {
      
    }
  }
}

module.exports = { СommandPanel }
