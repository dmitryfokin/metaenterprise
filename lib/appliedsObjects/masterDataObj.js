'use strict';

class MasterDataObj {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'masterdataobj',
    };
  }

  async save() {
    // TODO: start transaction
    const failure = false;
    this.beforeSave(failure);

    this.afterSave(failure);
    // TODO: comiit or rallback transaction
  }

  async beforeSave() {

  }

  async afterSave() {

  }
}

module.exports = { MasterDataObj }
