({
  metadata: {
    type: 'enterprise/systemActions',
    name: 'dbStructur',
  },

  async initDBStructure() {
    const enterprise = this.metadata.enterprise;
    // TODO: нуэно продумать последовательность создание объектов БД и правильную
    //   обработку ошибок
    // await enterprise.loadMetadataFromFiles(path.join(enterprise.root, 'data', 'schemas'));
    const firstScripts = initScripts.map((script) => ({
      kind: 'query',
      query: script,
      values: [],
    }));
    const query = enterprise.systemData.sqlCreateDBStructure();
    const res = await enterprise.db.executeTransaction(
      [...firstScripts, ...query],
    );

    if (res.status !== 'success') return res;

    const roleDeveloper = await enterprise.systemData.Role.create();
    roleDeveloper.name = 'Developer';
    await roleDeveloper.save();

    return res;
  },

  async dropDBStructure() {
    const enterprise = this.metadata.enterprise;
    // TODO: Структуру надо брать из systemData_Schema, а не из файлов
    // await enterprise.loadMetadataFromFiles(path.join(enterprise.root, 'data', 'schemas'));
    const query = enterprise.systemData.sqlDropDBStructure();
    const lastScripts = dropScripts.map((script) => ({
      kind: 'query',
      query: script,
      values: [],
    }));

    const res = await enterprise.db.executeTransaction(
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
