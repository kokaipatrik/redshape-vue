<template>
  <div
    class="card card--new"
    @click="newValue">
    <figure class="card__figure">
      <NewIcon />
    </figure>
    <div class="card__title">
      {{ $t("New") }}
    </div>
  </div>
</template>

<script>
import NewIcon from '@/assets/svg/plus.svg';

export default {
  name: 'CardNew',
  components: {
    NewIcon,
  },
  methods: {
    newValue() {
      this.$store.dispatch('showNewValueModal');
      this.$store.dispatch('disableScrollLock');
      this.scrollLock();
    }
  }
}
</script>

<style lang="scss" scoped>
.card.card--new {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 71px;
  margin-left: 18px;
  padding: 0 8px;
  background: var(--dark-gray);
  border: 1px solid var(--dark-gray-3);
  border-radius: 14px;
  box-sizing: border-box;
  cursor: pointer;

  .card__figure svg {
    fill: var(--medium-gray);
  }

  .card__title {
    margin-top: 2px;
    color: var(--medium-gray);
    font-size: 13px;
    font-weight: 600;
  }
}
</style>
