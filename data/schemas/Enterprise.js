({
  metadata: {
    type: 'enterprise/systemData',
    name: 'Enterprise',
    description: {
      en: 'Enterprise',
      ru: 'Приложение',
    },
    representationDefinition: {},
    fields: {
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
    },
    subTables: {
    },
    hooks: {
      beforeLoadApplication: async (failure = false) => {
        console.debug('Before load enterprise application');
      },
      beforeLoadSession: async (failure = false) => {
        console.debug('Before load enterprise application');
      },
      beforeSave: async (failure = false) => {
        console.debug('Before save Enterprise');
      },
      afterSave: async (failure = false) => {
        console.debug('After save Enterprise');
      },
    },
  },
});

