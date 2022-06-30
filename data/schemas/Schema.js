({
  metadata: {
    type: 'enterprise/systemData',
    name: 'Schema',
    description: {
      en: 'Schema DB',
      ru: 'Схемы БД',
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
          en: 'Data schema',
          ru: 'Данные схемы',
        },
      },
      kind: {
        type: 'string',
        pg: {
          type: 'varchar',
        },
        name: 'kind',
        description: {
          en: 'Kind',
          ru: 'Вид данных',
        },
      },
      type: {
        type: 'string',
        pg: {
          type: 'varchar',
        },
        name: 'type',
        description: {
          en: 'Type',
          ru: 'Тип',
        },
      },
      name: {
        type: 'string',
        pg: {
          type: 'varchar',
        },
        name: 'name',
        description: {
          en: 'Name',
          ru: 'Имя схемы',
        },
      },
      nameTable: {
        type: 'string',
        pg: {
          type: 'varchar',
        },
        name: 'nameTable',
        description: {
          en: 'Name table',
          ru: 'Имя таблицы',
        },
      },
      hash: {
        type: 'string',
        pg: {
          type: 'varchar',
        },
        name: 'hash',
        description: {
          en: 'Hash',
          ru: 'Hash файла',
        },
      },
    },
    subTables: {
    },
    hooks: {
      beforeSave: async (failure = false) => {
        console.debug('Before save Schema');
      },
      afterSave: async (failure = false) => {
        console.debug('After save Schema');
      },
    },
  },
});
