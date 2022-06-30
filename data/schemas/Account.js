({
  metadata: {
    type: 'enterprise/systemData',
    name: 'Account',
    description: {
      en: 'Accounts',
      ru: 'Аккаунты пользователей',
    },
    representationDefinition: {},
    fields: {
      dataPassword: {
        type: 'object',
        pg: {
          type: 'jsonb',
        },
        name: 'dataPassword',
        description: {
          en: 'Data password',
          ru: 'Данные пароля',
        },
      },
      login: {
        type: 'string',
        pg: {
          type: 'varchar',
          notNULL: true,
        },
        name: 'login',
        description: {
          en: 'Login',
          ru: 'Логин',
        },
      },
      password: {
        type: 'string',
        pg:{ 
          type: 'varchar',
          notNULL: true,
        },
        name: 'password',
        secretField: true,
        description: {
          en: 'Password',
          ru: 'Пароль',
        },
      },
    },
    subTables: {
      userRoles: {
        name: 'userRoles',
        description: {
          en: 'User roles',
          ru: 'Роли пользователя',
        },
        fields: {
          Role: {
            type: 'enterprise/systemData/Role',
            pg: {
              type: 'uuid',
            },
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
