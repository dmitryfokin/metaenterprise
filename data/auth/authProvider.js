'use strict';

module.exports = (init) => () => {
  const iface = {};
  const { config, metautil } = init;

  iface['generateToken'] = async () => {
    const { characters, secret, length } = config.sessions;
    return metautil.generateToken(secret, characters, length);
  };

  iface['saveSession'] = async (token, data) => {
    //db.pg.update('Session', { data: JSON.stringify(data) }, { token });
  };

  iface['startSession'] = async (token, data, fields = {}) => {
    // const record = { token, data: JSON.stringify(data), ...fields };
    // db.pg.insert('Session', record);
  };

  iface['restoreSession'] = async (token) => {
    // const record = await db.pg.row('Session', ['data'], { token });
    // if (record && record.data) return record.data;
    return null;
  };

  iface['deleteSession'] = async (token) => {
    // db.pg.delete('Session', { token });
  };

  iface['registerUser'] = async (login, password) => {
    // return db.pg.insert('Account', { login, password });
  };

  iface['registerUser'] = async (login, password) => {
    // return db.pg.insert('Account', { login, password });
  };

  iface['getUser'] = async (login) => {
    // return db.pg.row('Account', { login });
  };

  return iface;
};
