'use strict';

const getToken = async (data) => {
  return { token: 'bebdfd48-61b6-434c-ae05-688f65cf304b' };
}

const getUserSessionData = async ({ token }) => {
  return {};
}

const setUserSessionData = async ({ token, userSessionData }) => {
  return { status: true };
}

const clearUserSessionData = async ({ token }) => {
  return { token: token };
}

module.exports = {
  userSessionActions: {
    getToken,
    getUserSessionData,
    setUserSessionData,
    clearUserSessionData,
  }
}
