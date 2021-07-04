<template>
  <header
    class="header header--main"
    :class="this.isPWA() ? 'header--pwa' : ''">
    <div class="header__statusbar"></div>
    <div class="header__logo">
      <router-link
        to="/"
        class="header__link"
        title="RedShape">
        <span class="logo"></span>
      </router-link>
    </div>
    <div
      v-if="showValues"
      class="header__title">
      {{ $t('Values') }}
    </div>
    <div
      v-if="this.$route.name == 'profile'"
      class="header__title">
      {{ $t('Profile') }}
    </div>
    <div
      v-if="showValues"
      class="header__nav">
      <HeaderValues />
    </div>
    <div class="header__profile">
      <ProfileDropdown />
    </div>
  </header>
</template>

<script>
import HeaderValues from '@/components/HeaderValues.vue';
import ProfileDropdown from '@/components/molecules/ProfileDropdown.vue';

export default {
  name: 'Header',
  components: {
    HeaderValues,
    ProfileDropdown,
  },
  computed: {
    showValues() {
      const values = [
        'values',
        'values/today',
        'values/weekly',
        'values/other',
      ];
      return values.some((v) => this.$route.name.includes(v));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss/vars/grid";

.header.header--main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .header__logo {
    display: flex;
    align-items: center;
    height: var(--header-height);

    .logo {
      display: block;
      width: 69px;
      height: 53px;
      transform: scale(.7);
      background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='69px' height='53px' viewBox='0 0 69 53' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EGroup 2 Copy%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='16.8767611%25' y1='47.1230294%25' x2='74.1445658%25' y2='53.3535762%25' id='linearGradient-1'%3E%3Cstop stop-color='%23F84D42' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23FF0087' offset='99.9908447%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='UI-Kit' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Artboard'%3E%3Cg id='Group-2-Copy'%3E%3Cpath d='M29.0762095,6.5943215 L11.0490052,27.8427174 C8.11263291,31.3037755 6.50078057,35.6951392 6.50078057,40.2339944 L6.50078057,44.5260014 L6.50078057,44.5260014 L34.670852,31.592828 L48.9880582,33.8839152 L56.5032303,27.5877113 L40.0373977,6.78124535 C37.608533,3.71209651 33.1515124,3.19304367 30.0823636,5.62190839 C29.715722,5.91206138 29.378695,6.23778637 29.0762095,6.5943215 Z' id='Path-3' fill-opacity='0.351210801' fill='%237F7F7F'%3E%3C/path%3E%3Cpath d='M66.5749989,32.0087273 C67.2061937,33.8279171 66.2878208,35.820846 64.4947905,36.5229148 L51.1748916,41.7383789 L51.1748916,41.7383789 C45.9479121,43.5519567 40.2264783,40.9595951 38.1326447,35.8593892 L38.051369,35.656907 C37.400939,34.0744583 35.6049755,33.3088237 34.0171805,33.9250477 L33.958471,33.9485037 L6.04935033,46.9239619 C4.39909694,47.6911947 2.43933713,46.9753651 1.67210429,45.3251118 C1.65116642,45.2800762 1.63124939,45.234573 1.61236846,45.188637 C0.879107794,43.4046675 1.67897859,41.3595103 3.42798275,40.5463664 L31.3371035,27.5709082 L31.3371035,27.5709082 C36.4613373,25.4647068 42.3227632,27.9113055 44.4289646,33.0355394 L44.4595629,33.1108492 L44.4895499,33.1864045 C45.170576,34.9228016 47.0865422,35.8215966 48.8523869,35.2450061 L48.9146462,35.2240422 L62.2345451,30.008578 C63.9393255,29.3410639 65.8624502,30.1819343 66.5299643,31.8867147 C66.5457723,31.9270871 66.5607867,31.9677658 66.5749989,32.0087273 Z' id='Path-2' fill='url(%23linearGradient-1)' fill-rule='nonzero' transform='translate(34.057352, 37.023494) rotate(-10.000000) translate(-34.057352, -37.023494) '%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
  }

  .header__nav {
    width: 100%;
  }

  &.header--pwa {
    padding-top: 44px;

    .header__statusbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background: var(--black);
    }
  }

  .header__title,
  .header__profile {
    display: none;
  }
}

@media (min-width: $lg) {
  .header.header--main {
    .header__logo svg {
      transform: scale(.94);
    }
  }

  .page.page--redshape:not(.guest) {
    .header.header--main {
      margin: 15px 40px;
      justify-content: space-between;
      flex-direction: row;

      .header__statusbar,
      .header__logo {
        display: none;
      }

      &.header--pwa {
        .header__statusbar {
          display: block;
        }
      }

      .header__nav {
        width: auto;
      }

      .header__title,
      .header__profile {
        display: block;
      }

      .header__title {
        color: white;
        font-size: 22px;
        font-weight: 700;
      }
    }
  }
}
</style>
