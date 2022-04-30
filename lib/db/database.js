'use strict';

class Database {
  constructor(options) {
    this.pool = new Pool(options);
    this.console = options.console || options.logger || console;
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

  close() {
    this.pool.end();
  }
}

module.exports = { Database }
