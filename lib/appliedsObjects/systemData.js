'use strict';

const { SystemDataManager } = require("metaenterprise/lib/appliedsObjects/systemDataManager");

class SystemData {
  constructor(enterprise) {
    this.metadata = {
      enterprise,
      kind: 'systemdata',
    };

    this.items = new Map();
  }

  async init() {
    this.systemData.initBefor();
    for (const [key, value] of this.systemData.items) {
      value.init();
    }
    this.systemData.initAfter();
  }

  async initBefor() {

  }

  async initAfter() {

  }

  set(name, exports) {
    this.items.set(name, new SystemDataManager(this.metadata.enterprise, exports));
  }

  get(name) {
    this.items.get(name);
  }

  sqlCreateDBStructure(name) {
    if (!this.items.has(name)) return;
    const metadata = this.items.get(name).metadata;
    const sqlScript = `
    CREATE TABLE "systemData_${metadata.name}" (
    "Ref" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "recordVersion" integer NOT NULL DEFAULT 1,
    ${metadata.map(field => field.generateSQLCreateField())}
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW() 
    );
    
    CREATE TRIGGER "set_timestamp_systemData_${metadata.name}"
    BEFORE UPDATE ON "systemData_${metadata.name}"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    `;
  }

  sqlPerformanceJOIN(name, postfix = '') {
    if (!this.items.has(name)) return;
    const metadata = this.items.get(name).metadata;
    const sqlScriptField = `
      t${postfix}.  
    `;
    const sqlScriptJoin = `
      JOIN weather w2  
    `;

    return { field: sqlScriptField, join: sqlScriptJoin };
  }

}

module.exports = { SystemData }
