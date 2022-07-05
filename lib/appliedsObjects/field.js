'use strict';

class Field {
  constructor(parent, data) {
    const e = parent.metadata.enterprise;
    this.name = data.name;
    this.type = data.type;
    this.parent = parent;
    this.pg = { ...data.pg, notNULL: !!data.pg.notNULL };

    this.isRef = e.systemTypes.isRef(this.type);
    this.parsedType = e.systemTypes.parseType(this.type);

    // TODO: нужно ли заполнять из data
    this.foreignKind = undefined;
    this.foreignSchema = undefined;
    this.foreignKey = '"ref"'; // TODO: а нужен ли параметр?
  }

  bindForeignKey() {
    const e = this.parent.metadata.enterprise;
    this.foreignKind = e[this.parsedType[1]];
    this.foreignSchema = this.foreignKind[this.parsedType[2]];
  }

  generateSQLCreateField() {
    let sqlScript = `"${this.name}"`;
    sqlScript += ' ' + this.pg.type;
    sqlScript += (this.pg.notNULL ? ' NOT NULL' : '');

    return sqlScript;
  }

  generateSQLFunctionParam() {
    let sqlScript = `IN "${this.name}"`;
    sqlScript += ' ' + this.pg.type;

    return sqlScript;
  }

  generateSQLName() {
    return `"${this.name}"`;
  }

  generateSQLForeignKey() {
    if (this.isRef)
      return ` FOREIGN KEY ("${this.name}") REFERENCES "${this.foreignKind.metadata.name}_${this.foreignSchema.metadata.name}"("ref")`;

    return '';
  }
}

module.exports = { Field }
