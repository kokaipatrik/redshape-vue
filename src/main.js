import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import router from './router';
import i18n from './i18n';
import store from './store';

import App from './App.vue';

const bodyScrollLock = require('body-scroll-lock');

if ('serviceWorker' in navigator) {
  runtime.register();
}

Vue.use(VueAxios, axios);

moment.locale(process.env.VUE_APP_LANG);
Vue.prototype.$moment = moment;

Vue.prototype.isPWA = () => {
  (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://')
};

Vue.prototype.user = localStorage.getItem('user') ? jwtDecode(localStorage.getItem('user')) : ''

function isAuthenticated() {
  if (Vue.prototype.user) return true;
  return false;
}

window.addEventListener('online', () => {
  store.dispatch('setOnlineOfflineStateValue', 'online');
  isAuthenticated() ? store.dispatch('fetchTodayValues') : '';
  isAuthenticated() ? store.dispatch('fetchWeeklyValues') : '';
});

window.addEventListener('offline', () => {
  store.dispatch('setOnlineOfflineStateValue', 'offline');
});

if (isAuthenticated()) {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('user');
}

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 403) {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
  return Promise.reject(error);
});

Vue.config.productionTip = false;

Vue.prototype.scrollLock = () => {
  let body = document.querySelector('#app');

  if (store.state.scrollLock.value) {
    bodyScrollLock.disableBodyScroll(body);
  }
  else {
    bodyScrollLock.enableBodyScroll(body);
  }
}

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app');
