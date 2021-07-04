import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const values = {
  state: {
    today: [],
    weekly: []
  },
  getters: {
    getTodayValues: (state) => {
      return state.today;
    },
    getWeeklyValues: (state) => {
      return state.weekly;
    },
  },
  mutations: {
    setToday: (state, value) => {
      state.today = value;
    },
    setWeekly: (state, value) => {
      state.weekly = value;
    },
  },
  actions: {
    fetchTodayValues: ({ commit }) => {
      axios
        .get(`${process.env.VUE_APP_API}/values/today`)
        .then(response => {
          commit('setToday', response.data.data)
        });
    },
    fetchWeeklyValues: ({ commit }) => {
      axios
        .get(`${process.env.VUE_APP_API}/values/weekly`)
        .then(response => {
          commit('setWeekly', response.data.data)
        });
    },
  }
};

export default values;
