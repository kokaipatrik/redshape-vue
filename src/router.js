import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/pages/Home.vue';
import NotFound from './components/pages/NotFound.vue';
import Login from './components/pages/auth/Login.vue';
import CreateAccount from './components/pages/auth/CreateAccount.vue';
import TodayValues from './components/pages/values/Today.vue';
import WeeklyValues from './components/pages/values/Weekly.vue';
import OtherValues from './components/pages/values/Other.vue';
import Profile from './components/pages/Profile.vue';

Vue.use(Router);

const originalPush = Router.prototype.push;

const isAuthenticated = () => {
  if (Vue.prototype.user) return true;
  return false;
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) router.push({ name: "404"});
      next();
    }
  },
  {
    path: '/create-account',
    name: 'create-account',
    component: CreateAccount,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) router.push({ name: "404"});
      next();
    }
  },
  {
    path: '/values',
    name: 'values',
    beforeEnter() {
      if (!isAuthenticated()) router.push({ name: "404"});
      router.push({ name: "values/today"});
    }
  },
  {
    path: '/values/today',
    name: 'values/today',
    component: TodayValues,
    beforeEnter(to, from, next) {
      if (!isAuthenticated()) router.push({ name: "404"});
      next();
    },
  },
  {
    path: '/values/weekly',
    name: 'values/weekly',
    component: WeeklyValues,
    beforeEnter(to, from, next) {
      if (!isAuthenticated()) router.push({ name: "404"});
      next();
    }
  },
  {
    path: '/values/other',
    name: 'values/other',
    component: OtherValues,
    beforeEnter(to, from, next) {
      if (!isAuthenticated()) router.push({ name: "404"});
      next();
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter(to, from, next) {
      if (!isAuthenticated()) router.push({ name: "404"});
      next();
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
];

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});

export default router;
