'use strict';

const { FormManagerServer } = require("metaform");

class MetaformAdapter {
  constructor(enterprise) {
    this.enterprise = enterprise;
    this.actionTarget = 'enterprise';
  }

  async processorData({ action }) {
    const data = await this.enterprise.processorData({ action });
    return data;
  }
  
  // ? TODO: не уверен, что тут должен торчать адаптер
  getFormManagerServer(context) {
    context.formManagerServer = new FormManagerServer(
      this,
      // context,
    );
  }

}

module.exports = { MetaformAdapter }
