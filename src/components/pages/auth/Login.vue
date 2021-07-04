<template>
  <section class="section section--auth section--login">
    <div class="section__welcome">
      <Welcome />
    </div>
    <div class="section__content">
      <h1 class="section__title">{{ $t("Login") }}</h1>
      <transition name="slide-fade">
        <div
          class="section__alert"
          v-if="output">
          {{ $t(output) }}
        </div>
      </transition>
      <form @submit.prevent="login">
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            :placeholder="$t('E-mail address')"
            v-model="email"
            id="email" />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            :placeholder="$t('Password')"
            v-model="password"
            id="password" />
        </div>

        <button type="submit" class="btn btn--primary">
          {{ $t("Login") }}
        </button>
      </form>
      <div class="section__bottom">
        <span class="section__lead">
          {{ $t("Don't have an account?") }}
        </span>
        <router-link to="/create-account" class="section__link">
          {{ $t("Create account") }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Welcome from '@/components/Welcome.vue';

export default {
  name: 'Login',
  components: {
    Welcome,
  },
  data() {
    return {
      email: '',
      password: '',
      output: '',
    };
  },
  methods: {
    login() {
      let self = this;

      this.axios
        .post(`${process.env.VUE_APP_API}/login`, {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          localStorage.setItem('user', response.data.accessToken);
          self.$router.push({ name: 'home' });
          window.location.reload();
        })
        .catch(function (error) {
          self.output = error.response.data.message;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@scss/section/_section-auth";
</style>
