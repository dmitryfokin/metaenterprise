({
  metadata: {
    type: 'me#/systemData/Account',
    name: 'Account',
    description: {
      en: 'Accounts',
      ru: 'Аккаунты пользователей',
    },
    representationDefinition: { field: 'login' },
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
        pg: {
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
        metadata: {
          type: 'me#/systemData/Account/userRoles',
          name: 'userRoles',
          description: {
            en: 'User roles',
            ru: 'Роли пользователя',
          },
          fields: {
            Role: {
              type: 'me#/systemData/Role',
              pg: {
                type: 'uuid',
              },
              name: 'Role',
              description: {
                en: 'Role',
                ru: 'Роль',
              },
            },
          },
        }
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
