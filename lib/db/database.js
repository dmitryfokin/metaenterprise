'use strict';

const { Pool } = require('pg');

class Database {
  constructor(options) {
    this.pool = new Pool(options);
    this.console = options.console || options.logger || console;
  }

  async connected() {
    try {
      const result = await this.pool.query('SELECT 1');
      return result.rows.length !== 0;
    } catch (error) {
      return false;
    }
  }

  async getTables() {
    try {
      const result = await this.pool.query(
        `
        SELECT TABLE_NAME "tableName",
          COLUMN_NAME "columnName",
          ORDINAL_POSITION "ordinalPosition",
          COLUMN_DEFAULT "columnDefault",
          IS_NULLABLE "isNullable",
          DATA_TYPE "dataType",
          CHARACTER_MAXIMUM_LENGTH "characterMaximumLength",
          CHARACTER_OCTET_LENGTH "characterOctetLength",
          NUMERIC_PRECISION "numericPrecision",
          NUMERIC_PRECISION_RADIX "numericPrecisionRadix",
          NUMERIC_SCALE "numericScale",
          DATETIME_PRECISION "datetimePrecision",
          UDT_NAME "udtName",
          IS_SELF_REFERENCING "isSelfReferencing",
          IS_IDENTITY "isIdentity",
          IDENTITY_GENERATION "identityGeneration"
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = 'public';`);

      const tables = new Map();
      for (const row of result.rows) {
        if (!tables.has(row.tableName)) tables.set(row.tableName, new Map());
        tables.get(row.tableName).set(row.columnName, { ...row });
      }
      return tables;
    } catch (error) {
      throw error;
    }
  }

  query(sql, values) {
    const data = values ? values.join(',') : '';
    this.console.debug(`${sql}\t[${data}]`);

    return this.pool.query(sql, values).catch((error) => {
      error.dbStack = error.stack;
      Error.captureStackTrace(error);
      throw error;
    });
  }

  // TODO: нужен более сложный механизм транзакций:
  // 1) с вложенными транзакциями
  // 2) с ручным управлением транзакциями
  async executeTransaction(actions) {
    const res = { status: 'undefined', res: [] };
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      for (const action of actions) {
        if (action.kind === 'callback') await action.fn(action.data || {});
        if (action.kind === 'query') {
          const rows = await client.query(action.query, action.values);
          res.res.push(rows);
        };
      }
      await client.query('COMMIT');
      res.status = 'success';
    } catch (e) {
      await client.query('ROLLBACK');
      res.status = 'error';
      res.message = [e];
      this.console.debug(e);
      //throw (e);
    } finally {
      client.release();
      return res;
    }
  }

  close() {
    this.pool.end();
  }
}

module.exports = { Database }
