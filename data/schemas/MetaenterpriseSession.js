({
  metadata: {
    type: 'enterprise/systemData',
    name: 'MetaenterpriseSession',
    description: {
      en: 'User sessin data',
      ru: 'Данные сессии пользователя',
    },
    representationDefinition: {},
    fields: {
      Account: {
        type: 'enterprise/systemData/MetaenterpriseAccount',
        pgType: 'uuid',
        name: 'Account',
        description: {
          en: 'Account',
          ru: 'Пользователь БД',
        },
      },
      data: {
        type: 'object',
        pgType: 'jsonb',
        name: 'data',
        description: {
          en: 'Data sessin',
          ru: 'Данные сессии',
        },
      },
      token: {
        type: 'string',
        pgType: 'varchar',
        name: 'token',
        description: {
          en: 'Token',
          ru: 'Токен',
        },
      },
      ip: {
        type: 'string',
        pgType: 'inet',
        name: 'ip',
        description: {
          en: 'ip',
          ru: 'ip',
        },
      },
    },
    tables: {
    },
    hooks: {
      beforeSave: async (failure = false) => {
        console.debug('Before save Nomenclature');
      },
      afterSave: async (failure = false) => {
        console.debug('After save Nomenclature');
      },
    },
  },
});
