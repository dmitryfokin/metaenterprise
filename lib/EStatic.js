const metawatch = require('metawatch');
//const path = require('path');

class EStatic {
  constructor({ application }) {
    this.application = application;
    this.files = new Map();
    this.filesKeys = new Map();
    this.conf = this.application.config.static;

    this.startWatch();
  }

  get(key) {
    return this.files.get(key);
  }

  delete(filePath) {
    if (!this.filesKeys.has(filePath)) return;
    this.files.delete(this.filesKeys.get(filePath));
    this.filesKeys.delete(filePath);
  }

  async loadPackage(packageName) {
    if (!this.conf) return;
    if (!this.conf[packageName]) return;
    const node = this.application.sandbox.node;
    const conf = this.conf[packageName];

    const pathPackage = node.path.join(
      this.application.root,
      conf.path
    );

    await this.load(pathPackage);
  }

  async load(targetPath) {
    const node = this.application.sandbox.node;
    this.watcher.watch(targetPath);
    try {
      const files = await node.fsp.readdir(
        targetPath,
        { withFileTypes: true }
      );
      await Promise.allSettled(Array.from(files).map(async (file) => {
        if (file.name.startsWith('.')) return;
        const filePath = node.path.join(targetPath, file.name);
        if (file.isDirectory()) await this.load(filePath);
        else await this.change(filePath);
      }));
    } catch (err) {
      this.application.console.error(err.stack);
    }
  }

  async change(filePath) {
    const { key, conf } = this.getFileConf(filePath);
    if (!key) return;
    const node = this.application.sandbox.node;
    try {
      const data = await node.fsp.readFile(filePath);
      this.files.set(conf.mountPath + key, data);
      this.filesKeys.set(filePath, key);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        this.application.console.error(err.stack);
      }
    }
  }

  startWatch() {
    this.watcher = new metawatch.DirectoryWatcher({
      timeout: this.application.config.server.timeouts.watch
    });

    this.watcher.on('change', (filePath) => {
      fs.stat(filePath, (err, stat) => {
        if (err) return;
        if (stat.isDirectory()) {
          this.load(filePath);
          return;
        }
        if (threadId === 1) {
          this.console.debug('Reload: /' + filePath);
        }
        this.change(filePath);
      });
    });

    this.watcher.on('delete', async (filePath) => {
        this.delete(filePath);
        if (threadId === 1) {
          this.console.debug('Deleted: /' + filePath);
        }
    });
  }

  getFileConf(filePath) {
    if (!this.conf) return { key: '', conf: null };
    const node = this.application.sandbox.node;
    const npm = this.application.sandbox.npm;
    const win = process.platform === 'win32';

    const nodeModulesPath = node.path.join(
      this.application.root,
      'node_modules',
    );
    const packageName = filePath
      .substring(nodeModulesPath.length + 1).split(node.path.sep)[0];
    if (!this.conf[packageName]) return { key: '', conf: null };
    const conf = this.conf[packageName];
    const pathPackage = node.path.join(
      this.application.root,
      conf.path,
    );

    let key = filePath.substring(pathPackage.length);
    if (win) key = npm.metautil.replace(key, node.path.sep, '/');

    return { key, conf };
  }
}

module.exports = { EStatic };
