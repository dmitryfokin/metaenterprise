({
  metadata: {
    type: 'enterprise/systemData',
    name: 'MetaenterpriseAccount',
    description: {
      en: 'Accounts',
      ru: 'Аккаунты пользователей',
    },
    representationDefinition: {},
    fields: {
      dataPassword: {
        type: 'object',
        pgType: 'jsonb',
        name: 'data',
        description: {
          en: 'Data password',
          ru: 'Данные пароля',
        },
      },
      login: {
        type: 'string',
        pgType: 'varchar',
        name: 'login',
        description: {
          en: 'Login',
          ru: 'Логин',
        },
      },
      password: {
        type: 'string',
        pgType: 'varchar',
        name: 'password',
        notNULL: true,
        secretField: true,
        description: {
          en: 'Password',
          ru: 'Пароль',
        },
      },
    },
    tables: {
      userRoles: {
        name: 'userRoles',
        description: {
          en: 'User roles',
          ru: 'Роли пользователя',
        },
        fields: {
          Role: {
            type: 'enterprise/systemData/MetaenterpriseRole',
            pgType: 'uuid',
            name: 'Account',
            description: {
              en: 'Account',
              ru: 'Пользователь БД',
            },
          },

        },
      },
    },
    hooks: {
      beforeSave: async (failure = false) => {
        console.debug('Before save Account');
      },
      afterSave: async (failure = false) => {
        console.debug('After save Account');
      },
    },
  },
});
