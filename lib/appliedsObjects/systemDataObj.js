'use strict';

const { SystemDataRef } = require("./systemDataRef.js");

class SystemDataObj {
  constructor(kindSystemData) {
    this.metadata = {
      enterprise: kindSystemData.metadata.enterprise,
      kind: `systemdata/${kindSystemData.metadata.name}/obj`,
      name: kindSystemData.metadata.name,
      systemData: kindSystemData.metadata.systemData,
      systemDataManager: kindSystemData,
    };
    this.data = {};

    Object.defineProperty(this, 'ref', {
      value: new SystemDataRef(kindSystemData),
      writable: false,
      configurable: false,
    });

    Object.defineProperty(this, 'recordVersion', {
      value: 0,
      writable: false,
      configurable: false,
    });

    Object.defineProperty(this, 'createdAt', {
      value: new Date,
      writable: false,
      configurable: false,
    });

    Object.defineProperty(this, 'updatedAt', {
      value: new Date,
      writable: false,
      configurable: false,
    });

    kindSystemData.metadata.fields.forEach((fieldMetadata, key) => {
      Object.defineProperty(this, key, {
        get() { return this.data[key] },
        set(value) {
          this.data[key] = value;
        },
      });
    });

    // kindSystemData.metadata.subTables.forEach((key, value) => {
    //   Object.defineProperty(this, key, {
    //     get() { return this.data[key] },
    //     set(value) {
    //       this.data[key] = value;
    //     },
    //   });
    // });

  }

  async save(failure = false) {
    const query = this.metadata.systemData.sqlInsert(this);
    const res = await this.metadata.enterprise.db.executeTransaction(
      [...query],
    );
    if (res) {
      const a = 1;
    }
    // // TODO: start transaction
    // const failure = false;
    // this.metadata.beforeSave(failure);


    // this.metadata.afterSave(failure);
    // // TODO: commit or rallback transaction
  }
}

module.exports = { SystemDataObj }
