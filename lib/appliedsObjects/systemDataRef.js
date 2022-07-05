'use strict';

class SystemDataRef {
  constructor(kindSystemData, data = {}) {
    this.metadata = {
      enterprise: kindSystemData.metadata.enterprise,
      kind: `systemData/${kindSystemData.metadata.name}/ref`,
      name: kindSystemData.metadata.name,
      systemData: kindSystemData.metadata.systemData,
      systemDataManager: kindSystemData,
    };
    this.emptyRef = !data.ref;

    kindSystemData.metadata.systemData.metadata.systemFields.forEach((fieldMetadata, key) => {
      this[key] = data[key];
    });
    kindSystemData.metadata.fields.forEach((fieldMetadata, key) => {
      this[key] = data[key];
    });

    Object.freeze(this);
  } 
}

class SystemDataRefShot {
  constructor(data = {}) {
    this.metadata = {
      kind: `systemData/${kindSystemData.metadata.name}/ref`,
      name: kindSystemData.metadata.name,
    };
    // kindSystemData.metadata.systemData.metadata.systemFields.forEach((fieldMetadata, key) => {
    //   this[key] = data[key];
    // });
    // kindSystemData.metadata.fields.forEach((fieldMetadata, key) => {
    //   this[key] = data[key];
    // });

    Object.freeze(this);
  } 
}

module.exports = { SystemDataRef }
