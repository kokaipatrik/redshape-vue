<template>
  <main class="page page--home">
    <Login v-if="!user" />
  </main>
</template>

<script>
import Login from '@/components/pages/auth/Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
  },
  created: function () {
    this.user
      ? this.$router.push({ name: 'values/today' })
      : this.$router.push({ name: 'login' });
  },
};
</script>
