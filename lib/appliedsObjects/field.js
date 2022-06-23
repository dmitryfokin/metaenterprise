'use strict';

class Field {
  constructor(data) {
    this.name = data.name;
    this.type = date.type;
    this.pgType = date.pgType;
    this.notNULL = !!date.notNULL;
  }



  generateSQLCreateField() {
    let sqlScript = `"${this.name}"`;
    sqlScript = sqlScript + ' ' + this.pgType;
    sqlScript = sqlScript + this.notNULL ? ' NOT NULL' : '';

    return sqlScript;
  }
}

module.exports = { Field }
