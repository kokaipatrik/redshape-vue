<template>
  <section class="section section--auth section--registration">
    <div class="section__welcome">
      <Welcome />
    </div>

    <div class="section__content">
      <h1 class="section__title">{{ $t("Create account") }}</h1>
      <transition name="slide-fade">
        <div class="section__alert" v-if="output && !success">
          {{ $t(output) }}
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="section__success" v-if="success">{{ $t(output) }}</div>
      </transition>
      <form @submit.prevent="registration">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            :placeholder="$t('Name')"
            v-model="username"
            id="username"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            :placeholder="$t('E-mail address')"
            v-model="email"
            id="email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            :placeholder="$t('Password')"
            v-model="password"
            id="password"
          />
        </div>

        <button type="submit" class="btn btn--primary">
          {{ $t("Create account") }}
        </button>
      </form>
      <div class="section__bottom">
        <span class="section__lead">
          {{ $t("Already have an account?") }}
        </span>
        <router-link to="/login" class="section__link">{{
          $t("Login")
        }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Welcome from '@/components/Welcome.vue';

export default {
  name: 'Registration',
  components: {
    Welcome,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      output: '',
      success: '',
    };
  },
  methods: {
    registration() {
      let self = this;

      this.axios
        .post(`${process.env.VUE_APP_API}/register`, {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(function () {
          self.success = 1;
          self.output = 'Successfully registration!';
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
