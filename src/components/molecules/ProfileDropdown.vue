<template>
  <div class="block block--profile-dropdown">
    <div
      class="block__head"
      @click="toggleDropdown()">
      <span class="block__user">
        {{ user.username }}
      </span>
      <figure class="block__icon">
        <ProfileIcon />
      </figure>
    </div>
    <div
      v-if="showDropdown"
      v-click-outside="hideDropdown"
      class="block__dropdown">
      <nav class="nav nav--profile-dropdown">
        <ul class="nav__list">
          <li
            v-for="(nav, index) in navItems"
            :key="index"
            @click="hideDropdown"
            class="nav__item">
            <router-link :to="nav.url" class="nav__link">
              {{ $t(nav.title) }}
            </router-link>
          </li>
          <li class="nav__item" @click="logout">
            {{ $t("Logout") }}
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

import ProfileIcon from '@/assets/svg/user.svg';

export default {
  name: 'ProfileDropdown',
  components: {
    ProfileIcon,
  },
  data() {
    return {
      showDropdown: false,
      navItems: [
        {
          url: '/profile',
          title: 'Profile',
        },
      ],
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    toggleDropdown() {
      this.showDropdown ? this.showDropdown = false : this.showDropdown = true;
    },
    hideDropdown() {
      this.showDropdown = false;
    },
    logout() {
      localStorage.removeItem('user');
      window.location.href = '/';
    },
  },
};
</script>

<style lang="scss" scoped>
.block.block--profile-dropdown {
  position: relative;

  .block__head {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
  }

  .block__user {
    margin-right: 16px;
    color: var(--medium-gray);
    font-size: 14px;
    font-weight: 600;
  }

  .block__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background-color: var(--dark-gray-3);
    border-radius: 18px;

    svg {
      fill: var(--light-gray-3);
      transform: scale(0.85);
    }
  }

  .block__dropdown {
    position: absolute;
    top: calc(100% + 22px);
    right: -12px;
    width: 140px;
    padding: 10px 16px;
    background: var(--dark-gray);
    border: 1px solid var(--dark-gray-3);
    border-radius: 16px;
    box-sizing: border-box;
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      top: -12px;
      right: 24px;
      width: 0;
      height: 0;
      border-bottom: 12px solid var(--dark-gray);
      border-right: 12px solid transparent;
      border-left: 12px solid transparent;
      z-index: 2;
    }

    &::after {
      content: '';
      position: absolute;
      top: -14px;
      right: 22px;
      width: 0;
      height: 0;
      border-bottom: 14px solid var(--dark-gray-3);
      border-right: 14px solid transparent;
      border-left: 14px solid transparent;
      z-index: 1;
    }
  }
}

.nav.nav--profile-dropdown {
  .nav__item {
    text-align: right;
    color: var(--medium-gray);
    font-size: 13px;
    font-weight: 600;
    line-height: 24px;
    list-style: none;
    cursor: pointer;
    transition: .2s;

    &:hover {
      color: var(--light-gray-2);
    }
  }

  .nav__link {
    color: var(--medium-gray);
    font-weight: 600;
    transition: .2s;

    &:hover {
      color: var(--light-gray-2);
    }
  }
}
</style>
