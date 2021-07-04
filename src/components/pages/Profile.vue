<template>
  <main class="page page--profile">
    <div class="block block--profile">
      <figure class="block__figure">
        <AvatarIcon />
      </figure>
      <h2 class="block__username">
        {{ user.username }}
      </h2>
      <span class="block__lead">
        {{ $t("Type 1 diabetic") }}
      </span>
      <div class="block__content">
        <nav class="nav nav--profile">
          <ul class="nav__list">
            <li class="nav__item">
              <router-link to="/settings" class="nav__link">
                {{ $t("Settings") }}
              </router-link>
            </li>
            <li class="nav__item" @click="logout">
              {{ $t("Logout") }}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
</template>

<script>
import AvatarIcon from '@/assets/svg/avatar.svg';

export default {
  name: 'Profile',
  components: {
    AvatarIcon,
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      window.location.href = '/';
    },
  },
};
</script>

<style lang="scss">
.block.block--profile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 40px auto 0;
  padding: 0 15px;
  box-sizing: border-box;
  width: 100%;

  .block__figure {
    svg {
      fill: var(--dark-gray-3);
      font-size: 50px;
    }
  }

  .block__username {
    margin-top: 12px;
    color: var(--light-gray-2);
    font-size: 16px;
    font-weight: 800;
  }

  .block__lead {
    margin-top: 4px;
    color: var(--medium-gray);
    font-size: 13px;
    font-weight: 500;
  }

  .block__content {
    width: 100%;
    margin-top: 35px;
  }
}

.nav.nav--profile {
  width: 100%;
  background: var(--dark-gray);
  border: 1px solid var(--dark-gray-3);
  border-radius: 16px;

  .nav__item {
    width: 100%;
    padding: 11px 0;
    list-style: none;
    color: var(--medium-gray-2);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: var(--light-gray-2);
    }
  }

  .nav__link {
    display: block;
    width: 100%;
    color: var(--medium-gray-2);
    font-weight: 600;
    transition: 0.3s;

    &:hover {
      color: var(--light-gray-2);
    }
  }
}
</style>
