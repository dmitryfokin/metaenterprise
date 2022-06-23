({
  metadata: {
    type: 'enterpriseMasterData',
    name: 'MetaenterpriseSession',
    description: {
      en: 'User sessin data',
      ru: 'Данные сессии пользователя',
    },
    codeDefinition: { type: null },
    descriptionDefinition: { type: null },
    representationDefinition: {},
    fields: {
      Account: {
        type: 'systemData.MetaenterpriseAccount',
        name: 'Account',
        description: {
          en: 'Account',
          ru: 'Пользователь БД',
        },
      },
      data: {
        type: 'json',
        name: 'data',
        description: {
          en: 'Data sessin',
          ru: 'Данные сессии',
        },
      },
      token: {
        type: 'string',
        name: 'token',
        description: {
          en: 'Token',
          ru: 'Токен',
        },
      },
      ip: {
        type: 'inet',
        name: 'ip',
        description: {
          en: 'ip',
          ru: 'ip',
        },
      },
      createdAt: {
        type: 'datetime',
        name: 'createdAt',
        description: {
          en: 'created at',
          ru: 'Дата создания',
        },
      },
      updatedAt: {
        type: 'datetime',
        name: 'updatedAt',
        description: {
          en: 'updated at',
          ru: 'Дата последнего обновления',
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
