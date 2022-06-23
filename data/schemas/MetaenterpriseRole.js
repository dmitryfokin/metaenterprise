({
  metadata: {
    type: 'enterprise/systemData',
    name: 'MetaenterpriseRole',
    description: {
      en: 'Roles users',
      ru: 'Роли пользователя',
    },
    representationDefinition: {},
    fields: {
      name: {
        type: 'string',
        pgType: 'varchar',
        name: 'name',
        description: {
          en: 'Name',
          ru: 'Наименование',
        },
      },
    },
    tables: {
    },
    hooks: {
      beforeSave: async (failure = false) => {
        console.debug('Before save Role');
      },
      afterSave: async (failure = false) => {
        console.debug('After save Role');
      },
    },
  },
});
