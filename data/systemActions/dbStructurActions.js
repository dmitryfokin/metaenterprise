({
  metadata: {
    type: 'me#/systemActions',
    name: 'dbStructur',
  },

  async initDBStructure() {
    // TODO: нуэно продумать последовательность создание объектов БД и правильную
    //   обработку ошибок
    const initScripts = [
      `
        CREATE OR REPLACE FUNCTION "triggerSetTimestamp"()
        RETURNS TRIGGER AS $$
        BEGIN
        NEW."updatedAt" = NOW();
        NEW."recordVersion" = OLD."recordVersion" + 1;
        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `,
    ];

    const firstScripts = initScripts.map((script) => ({
      kind: 'query',
      query: script,
      values: [],
    }));
    const query = systemData.sqlCreateDBStructure();
    const res = await db.executeTransaction(
      [...firstScripts, ...query],
    );

    if (res.status !== 'success') return res;

    // const roleDeveloper = await systemData.Role.create();
    // roleDeveloper.name = 'Developer';
    // await roleDeveloper.save();

    return res;
  },

  async dropDBStructure() {
    const dropScripts = [
      `
      DROP FUNCTION "triggerSetTimestamp";
      `,
    ];
    // TODO: Структуру надо брать из systemData_Schema, а не из файлов
    const query = systemData.sqlDropDBStructure();
    const lastScripts = dropScripts.map((script) => ({
      kind: 'query',
      query: script,
      values: [],
    }));

    const res = await db.executeTransaction(
      [...query, ...lastScripts],
    );

    return res;
  },

  async updateDBStructure() {
  },

  async testDB() {
    //const e = this.metadata.enterprise;
    // await enterprise.loadMetadataFromFiles(path.join(enterprise.root, 'data', 'schemas'));
    const l = await systemData.Role.getLinkByAttr('name', 'Developer');
  },
});
