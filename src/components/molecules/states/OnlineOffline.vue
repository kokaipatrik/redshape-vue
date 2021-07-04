<template>
  <div
    class="state"
    :class="`state--${getClassByType}`">
    {{ getContent }}
  </div>
</template>

<script>
export default {
  name: 'OnlineOffline',
  props: ['type'],
  computed: {
    getClassByType() {
      if (this.type == 'online') {
        return 'online';
      }
      else if (this.type == 'offline') {
        return 'offline';
      }
      return false;
    },
    getContent() {
      if (this.type == 'online') {
        return 'You\'re online now.';
      }
      else if (this.type == 'offline') {
        return 'You\'re offline now.';
      }
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@scss/states/base';

.state.state--online {
  background: var(--green);
}

.state.state--offline {
  background: var(--coral-pink);
}
</style>
