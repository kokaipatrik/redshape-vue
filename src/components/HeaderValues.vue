<template>
  <nav class="nav nav--values">
    <ul class="nav__list">
      <router-link
        v-for="(value, index) in valueTitles"
        :key="value.name"
        :data-id="index"
        :to="value.url"
        class="nav__link">
        {{ $t(value.name) }}
      </router-link>
      <span class="nav__bg"></span>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HeaderValues',
  data() {
    return {
      activeTitle: 0,
      valueTitles: [
        {
          name: 'Today',
          url: '/values/today',
        },
        {
          name: '7 days',
          url: '/values/weekly',
        },
        {
          name: 'Other',
          url: '/values/other',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss/vars/grid";

.nav.nav--values {
  margin-top: 10px;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;

  .nav__list {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    width: 100%;
    height: 44px;
    background: var(--dark-gray-2);
    border-radius: 16px;
    box-sizing: border-box;
    z-index: 0;
  }

  .nav__bg {
    position: absolute;
    top: 6px;
    left: 6px;
    width: calc(33% - 3px);
    height: calc(100% - 12px);
    border-radius: 12px;
    background: var(--dark-gray-4);
    box-shadow: var(--box-shadow);
    color: var(--light-gray);
    transition: .2s;
  }

  .nav__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    list-style: none;
    cursor: pointer;
    color: var(--medium-gray-2);
    font-size: 12px;
    font-weight: 600;
    border-radius: 12px;
    transition: 0.3s;
    z-index: 1;

    &:active {
      ~ .nav__bg {
        transform: scale(.95);
      }
    }

    &.active {
      color: var(--light-gray);
    }

    &:nth-child(2).active ~ .nav__bg {
      left: 33%;
    }

    &:nth-child(3).active ~ .nav__bg {
      left: 66%;
    }
  }
}

@media (min-width: $lg) {
  .nav.nav--values {
    margin-top: 0;
    width: 420px;
  }
}
</style>
