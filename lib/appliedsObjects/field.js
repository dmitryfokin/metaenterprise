'use strict';

class Field {
  constructor(data) {
    this.name = data.name;
    this.type = data.type;
    this.pg = { ...data.pg, notNULL: !!data.pg.notNULL};
  }



  generateSQLCreateField() {
    let sqlScript = `"${this.name}"`;
    sqlScript = sqlScript + ' ' + this.pg.type;
    sqlScript = sqlScript + (this.pg.notNULL ? ' NOT NULL' : '');

    return sqlScript;
  }
}

module.exports = { Field }
