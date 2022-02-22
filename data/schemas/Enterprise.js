({
  Struct: {
    store: 'memory',
    scope: 'application',
    allow: 'read',
  },
  fn: {
    type: 'script',
    async module() {
      const beforeLoadApplication = async (failure = false) => {
        console.debug('Before load enterprise application');
      };
      const beforeLoadSession = async (failure = false) => {
        console.debug('Before load enterprise application');
      };
    },
  },
  metadata: {
    type: 'enterprise',
    description: 'Prototype enterprise application on Metarhia',
  },
});
