<template>
  <div
    class="notification"
    :class="`notification--${getClassByType}`">
    {{ getContent }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['content'],
  computed: {
    getContent() {
      return this.content.value;
    },
    getClassByType() {
      if (this.content.type == 'success') {
        return 'success';
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@scss/vars/grid";

.notification {
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom) + 65px);
  left: 15px;
  z-index: 9;

  &.notification--success {
    width: 240px;
    padding: 14px 16px;
    margin-bottom: 20px;
    color: #155724;
    font-family: "Montserrat", sans-serif;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    background: #d4edda;
    border: 0;
    border-radius: 14px;
    box-shadow: 0 6px 29px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    outline: 0;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 14px;
      width: 18px;
      height: 18px;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Echeck%3C/title%3E%3Cpath d='M0 10C0 4.48 4.48 0 10 0s10 4.48 10 10-4.48 10-10 10S0 15.52 0 10c0-3.68 0-3.68 0 0zm8 2.17l6.59-6.59L16 7l-8 8-4-4 1.41-1.41L8 12.17z' fill='%23155724' fill-rule='evenodd'/%3E%3C/svg%3E");
      background-size: 18px;
      transform: translateY(-50%);
    }
  }
}

@media (min-width: $lg) {
  .notification {
    left: 115px;
    bottom: calc(env(safe-area-inset-bottom) + 5px);
  }
}
</style>
