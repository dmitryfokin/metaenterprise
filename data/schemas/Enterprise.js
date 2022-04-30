({
  metadata: {
    type: 'enterprise',
    description: 'Prototype enterprise application on Metarhia',
  },
  hooks: {
    beforeLoadApplication: async (failure = false) => {
      console.debug('Before load enterprise application');
    },
    beforeLoadSession: async (failure = false) => {
      console.debug('Before load enterprise application');
    },
  },
});
