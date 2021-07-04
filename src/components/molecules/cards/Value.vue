<template>
  <div class="card card--value">
    <div
      class="card__wrapper"
      @click="openModal">
      <div
        v-if="isMeal()"
        class="card__content">
        <h3 class="card__title">
          {{ title }}
        </h3>
        <div class="card__values">
          <ul class="values">
            <li
              v-for="value in filteredValues"
              :key="value.value"
              :class="valueStatus(value.value)"
              class="value">
              {{ Number(value.value).toFixed(1) }}
            </li>
          </ul>
        </div>
      </div>
      <div
        v-else
        class="card__content is-single-value">
        <time class="card__time">
          {{ $moment(new Date(date)).format('LT') }}
        </time>
        <div
          class="value"
          :class="valueStatus(values[0])">
          {{ values[0] }}
        </div>
      </div>
    </div>
    <Meal
      v-if="showModal"
      @showModal="newValue"
      :id="id"
      :image="null"
      :date="date"
      :title="title"
      :values="values" />
  </div>
</template>

<script>
import values from '@/helpers/values';
import Meal from '@/components/modals/Meal';

export default {
  name: 'CardValue',
  mixins: [values],
  components: {
    Meal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  props: ['id', 'date', 'title', 'values'],
  computed: {
    filteredValues() {
      return this.values.filter(value => value.value)
    }
  },
  methods: {
    isMeal() {
      return (Object.prototype.hasOwnProperty.call(this.values[0], 'type')) ? true : false;
    },
    openModal() {
      this.showModal = true;
    },
    newValue(reply) {
      this.showModal = reply;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss/vars/grid";

.card.card--value {
  display: inline-block;
  min-width: 100px;
  max-width: 140px;
  margin-left: 18px;
  padding: 0 8px;
  background: var(--dark-gray);
  border: 1px solid var(--dark-gray-3);
  border-radius: 14px;
  box-sizing: border-box;

  &:first-child {
    margin-left: 15px;
  }

  &:last-child {
    margin-right: 15px;
  }

  .card__wrapper {
    display: flex;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .card__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    &.is-single-value {
      align-items: center;
      padding: 4px 0 1px;
    }
  }

  .card__title,
  .card__time {
    margin-bottom: 6px;
    color: var(--light-gray-3);
    font-size: 13px;
    font-weight: 700;
  }
}

@media (min-width: $lg) {
  .card.card.card--value {
    min-width: 120px;
    max-width: 160px;
    padding: 6px 14px;
    border-radius: 18px;

    .card__title,
    .card__time {
      font-size: 14px;
    }
  }
}
</style>
