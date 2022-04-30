'use strict';

class MetaformAdapter {
  constructor(enterprise) {
    this.enterprise = enterprise;
  }

  async getData({ data }) {
    if (data.path === 'enterprise/applicationMenu')
      return await this.enterprise.metadata.commandsPanels.getApplicationMenu();
    return { appMenu: 'items' };
  }
}

module.exports = { MetaformAdapter }
