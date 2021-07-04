const scrollLock = {
  state: {
    value: '',
  },
  mutations: {
    setScrollLock: (state, value) => {
      state.value = value;
    }
  },
  actions: {
    enableScrollLock: ({ commit }) => {
      commit('setScrollLock', true);
    },
    disableScrollLock: ({ commit }) => {
      commit('setScrollLock', false);
    },
  }
};

export default scrollLock;
