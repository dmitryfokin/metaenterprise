'use strict';

const { userSessionActions } = require("./userSessionActions.js");
const { dbEmptyStructur } = require("./dbEmptyStructur.js");

class SystemActions {
  constructor(enterprise) {
    this.metadata = {
      enterprise: enterprise,
      kind: 'systemactions',
    };
  }

  async init(emptyStructure = false) {
    if (emptyStructure) {
      this.loadActions(dbEmptyStructur);
      return;
    };
    this.loadActions(userSessionActions);
  }

  loadActions(actions) {
    for (const key in actions) {
      this[key] = actions[key];
      //this.constructor.prototype[key] = actions[key];
    }
  }

  async run({ action }) {
    const key = action.name.split('/')[1];
    if (!this[key]) return null; // TODO: надо выдавать ошибку
     
    const res = await this[key](action.data || {});
    return res;

  }
}

module.exports = { SystemActions }
