<template>
  <div id="app">
    <main
      class="page page--redshape"
      :class="this.user ? '' : 'guest'">
      <Header />
      <router-view />
      <transition name="slide-fade-left">
        <Notification
          v-if="this.$store.state.notifications.notification.value"
          :content="this.$store.state.notifications.notification" />
      </transition>
      <transition name="slide-fade-bottom">
        <OnlineOffline
          v-if="this.$store.state.onlineOffline.value"
          :type="this.$store.state.onlineOffline.value" />
      </transition>
    </main>
    <MainNavigation v-if="user" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import MainNavigation from '@/components/MainNavigation.vue';
import Notification from '@/components/molecules/states/Notification';
import OnlineOffline from '@/components/molecules/states/OnlineOffline';

export default {
  name: 'App',
  components: {
    Header,
    MainNavigation,
    Notification,
    OnlineOffline,
  },
  created () {
    document.title = 'RedShape';

    this.user ? this.$store.dispatch('fetchTodayValues') : '';
    this.user ? this.$store.dispatch('fetchWeeklyValues') : '';
  }
}
</script>

<style lang="scss">
@import "@scss/_style";
@import "~@scss/vars/grid";

.page.page--redshape {
  width: 100%;
  min-height: calc(100vh - 75px);
  padding-bottom: 75px;
  overflow: scroll;

  &.guest {
    padding-bottom: 0;
  }
}

@media (min-width: $lg) {
  .page.page--redshape {
    padding-bottom: 0;
    box-sizing: border-box;

    &:not(.guest) {
      padding-left: 88px;
    }
  }
}
</style>
