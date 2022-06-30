({
  metadata: {
    type: 'enterprise/systemData',
    name: 'Role',
    description: {
      en: 'Roles users',
      ru: 'Роли пользователя',
    },
    representationDefinition: {},
    fields: {
      name: {
        type: 'string',
        pg: {
          type: 'varchar',
        },
        name: 'name',
        description: {
          en: 'Name',
          ru: 'Наименование',
        },
      },
    },
    subTables: {
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
