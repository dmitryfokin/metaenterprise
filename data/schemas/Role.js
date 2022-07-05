({
  metadata: {
    type: 'me#/systemData/Role',
    name: 'Role',
    description: {
      en: 'Roles users',
      ru: 'Роли пользователя',
    },
    representationDefinition: {field: 'name'},
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
