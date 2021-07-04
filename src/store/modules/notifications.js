const notifications = {
  state: {
    notification: {},
  },
  mutations: {
    setNotification: (state, payload) => {
      state.notification = payload;
    }
  },
  actions: {
    setNotification: ({ commit }, payload) => {
      commit('setNotification', payload);

      setTimeout(() => {
        commit('setNotification', {});
      }, 2500);
    }
  }
};

export default notifications;
