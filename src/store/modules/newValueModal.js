const newValueModal = {
  state: {
    value: '',
  },
  mutations: {
    setNewValueModal: (state, value) => {
      state.value = value;
    }
  },
  actions: {
    showNewValueModal: ({ commit }) => {
      commit('setNewValueModal', true);
    },
    hideNewValueModal: ({ commit }) => {
      commit('setNewValueModal', false);
    },
  }
};

export default newValueModal;
