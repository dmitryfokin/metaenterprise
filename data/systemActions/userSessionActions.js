({
  metadata: {
    type: 'me#/systemActions',
    name: 'userSession',
  },

  async getToken(data) {
    return { token: 'bebdfd48-61b6-434c-ae05-688f65cf304b' };
  },

  async getUserSessionData({ token }) {
    const sessionRec = await enterprise.systemData.Session.getLinkByAttr('token', token);
    return sessionRec.data || {};
  },

  async setUserSessionData({ token, userSessionData }) {
    return { status: true };
  },

  async clearUserSessionData({ token }) {
    return { token: token };
  },
});
