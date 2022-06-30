({
  metadata: {
    type: 'enterprise/systemData',
    name: 'Session',
    description: {
      en: 'User sessin data',
      ru: 'Данные сессии пользователя',
    },
    representationDefinition: {},
    fields: {
      Account: {
        type: 'enterprise/systemData/Account',
        pg: {
          type: 'uuid',
        },
        name: 'Account',
        description: {
          en: 'Account',
          ru: 'Пользователь БД',
        },
      },
      data: {
        type: 'object',
        pg: {
          type: 'jsonb',
        },
        name: 'data',
        description: {
          en: 'Data sessin',
          ru: 'Данные сессии',
        },
      },
      token: {
        type: 'string',
        pg: {
          type: 'varchar',
        },
        name: 'token',
        description: {
          en: 'Token',
          ru: 'Токен',
        },
      },
      ip: {
        type: 'string',
        pg: {
          type: 'inet',
        },
        name: 'ip',
        description: {
          en: 'ip',
          ru: 'ip',
        },
      },
    },
    subTables: {
    },
    hooks: {
      beforeSave: async (failure = false) => {
        console.debug('Before save Session');
      },
      afterSave: async (failure = false) => {
        console.debug('After save Session');
      },
    },
  },
});
