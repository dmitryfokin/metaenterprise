'use strict';

const path = require('path');

class SystemActions {
  constructor(enterprise) {
    this.metadata = {
      enterprise: enterprise,
      kind: 'systemActions',
      fullKind: 'enterprise/systemActions',
    };
    this.items = new Map();
  }

  async init() {

    const e = this.metadata.enterprise;
    await e.loadMetadataFromFiles(path.join(e.root, 'data', 'systemActions'));
  }

  set(nameSchema, exports) {
    this.items.set(nameSchema, exports); 
    for (const nameAction of Object.keys(exports)) {
      if (nameAction === 'metadata' || nameAction === 'hashFile') continue;
      this[nameAction] = exports[nameAction];
    }
  }

  get(nameSchema) {
    return this.items.get(nameSchema);
  }

  async run({ action }) {
    const key = action.name.split('/')[1];
    if (!this[key]) return null; // TODO: надо выдавать ошибку
    
    const res = await this[key](action.data || {});
    return res;
  }
}

module.exports = { SystemActions }
