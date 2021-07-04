const onlineOffline = {
  state: {
    value: '',
  },
  mutations: {
    setValue: (state, value) => {
      state.value = value;
    }
  },
  actions: {
    setOnlineOfflineStateValue: ({ commit }, value) => {
      commit('setValue', value);

      setTimeout(() => {
        commit('setValue', '');
      }, 2500);
    }
  }
};

export default onlineOffline;
