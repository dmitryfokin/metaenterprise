'use strict';

const { initScripts, dropScripts } = require("../../data/db/initSeed.js");

async function initDBStructure() {
  const { db } = this.metadata.enterprise;
  const res = await db.executeTransaction(
    initScripts.map((script) => ({ 
      kind: 'query',
      query: script, 
      values: []
     }))
  );

  return res;
}

async function dropDBStructure() {
  const { db } = this.metadata.enterprise;
  const res = await db.executeTransaction(
    dropScripts.map((script) => ({ 
      kind: 'query',
      query: script, 
      values: [],
     }))
  );

  return res;
}

module.exports = {
  dbEmptyStructur: {
    initDBStructure,
    dropDBStructure,
  }
}
