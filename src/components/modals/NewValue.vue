<template>
  <div class="block block--modal block--new-value">
    <div class="block__backdrop" @click="exit"></div>
    <div class="block__content">
      <div class="block__right">
        <button type="button" class="block__exit" @click="exit">
          <ExitIcon />
        </button>
      </div>
      <h2 class="block__title">
        {{ $t("New value") }}
      </h2>
      <transition name="slide-fade">
        <div v-if="response" class="block__response">
          {{ $t(response) }}
        </div>
      </transition>

      <div class="block__form">
        <form @submit.prevent="submitValue">
          <div class="form-group form-group--meal">
            <div class="form-label">
              <label>{{ $t("Meal") }}</label>
            </div>
            <div class="form-content">
              <div class="selector selector--meal">
                <div
                  v-for="(selector, index) in mealSelectors"
                  :key="index"
                  :class="meal == index ? 'active' : ''"
                  class="selector__item"
                  :data-selector-value="index"
                  @click="mealSelect"
                >
                  {{ $t(selector) }}
                </div>
              </div>
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="meal == 1" class="form-group form-group--meal-category">
              <div class="selector selector--meal-category">
                <div
                  v-for="(meal, index) in mealCategories"
                  :key="index"
                  :class="mealCategory == index ? 'active' : ''"
                  class="selector__item"
                  :data-value="index"
                  @click="mealCategorySelect"
                >
                  <figure class="selector__figure">
                    <div v-if="meal.icon == 'breakfast'">
                      <BreakfastIcon />
                    </div>
                    <div v-if="meal.icon == 'lunch'">
                      <LunchIcon />
                    </div>
                    <div v-if="meal.icon == 'dinner'">
                      <DinnerIcon />
                    </div>
                    <div v-if="meal.icon == 'snack'">
                      <SnackIcon />
                    </div>
                  </figure>
                  <div class="selector__title">
                    {{ $t(meal.value) }}
                  </div>
                  <span class="selector__checkbox"></span>
                </div>
              </div>
            </div>
          </transition>
          <hr />
          <transition name="slide-fade">
            <div v-if="meal == 1" class="form-group form-group--before-after">
              <div class="form-label">
                <label>{{ $t("Meal before/after") }}</label>
              </div>
              <div class="form-content">
                <div class="selector selector--before-after">
                  <div
                    v-for="(selector, index) in mealBeforeAfter"
                    :key="index"
                    :class="beforeAfter == index ? 'active' : ''"
                    class="selector__item"
                    :data-selector-value="index"
                    @click="beforeAfterSelect"
                  >
                    {{ $t(selector) }}
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div class="form-group form-group--value">
            <div class="form-label">
              <label>{{ $t("Sugar blood") }}</label>
            </div>
            <div class="form-content">
              <div class="form-input-group">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  class="form-input form-control"
                  name="value"
                  id="value"
                  autocomplete="off"
                  v-model="value"
                />
                <span class="form-unit">mmol/l</span>
              </div>
            </div>
          </div>
          <div class="form-group form-group--datetime">
            <div class="form-label">
              <label>{{ $t("Date") }}</label>
            </div>
            <div class="form-content">
              <div class="form-date-group" @click="showDatetimeSelect">
                <div
                  class="form-control"
                  v-html="
                    selectedDate.toLocaleDateString() !=
                    new Date().toLocaleDateString()
                      ? this.$moment(selectedDate).format('YYYY. MMM D.')
                      : $t('Now')
                  "
                ></div>
                <span class="form-date-icon">
                  <CalendarIcon />
                </span>
              </div>
            </div>
            <div class="datetime-select" v-if="datetimeSelect">
              <div class="form-group form-group--date">
                <div class="form-content">
                  <DatePicker
                    v-model="selectedDate"
                    :masks="{ input: ['YYYY. MMMM DD.'] }"
                    :maxDate="new Date()"
                    color="red"
                    is-dark>
                  </DatePicker>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group form-group--submit">
            <button type="submit" class="btn btn--primary">
              {{ $t("Add") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

import ExitIcon from '@/assets/svg/exit.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';
import BreakfastIcon from '@/assets/svg/breakfast.svg';
import LunchIcon from '@/assets/svg/lunch.svg';
import DinnerIcon from '@/assets/svg/dinner.svg';
import SnackIcon from '@/assets/svg/snack.svg';

export default {
  name: 'NewValue',
  components: {
    DatePicker,
    ExitIcon,
    CalendarIcon,
    BreakfastIcon,
    LunchIcon,
    DinnerIcon,
    SnackIcon,
  },
  data() {
    return {
      response: null,
      datetimeSelect: false,
      meal: '0',
      mealCategory: '0',
      beforeAfter: '0',
      value: '',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD',
      },
      selectedDate: new Date(),
      mealSelectors: ['No', 'Yes'],
      mealCategories: [
        {
          icon: 'breakfast',
          value: 'Breakfast',
        },
        {
          icon: 'lunch',
          value: 'Lunch',
        },
        {
          icon: 'dinner',
          value: 'Dinner',
        },
        {
          icon: 'snack',
          value: 'Snack',
        },
      ],
      mealBeforeAfter: ['Before', 'After'],
    };
  },
  methods: {
    exit() {
      this.$store.dispatch('hideNewValueModal');
      this.$store.dispatch('disableScrollLock');
      this.scrollLock();
    },
    submitValue() {
      let self = this;
      let mealObject = {
        meal: this.meal,
        mealCategory: this.mealCategory,
        beforeAfter: this.beforeAfter,
        value: this.value,
        date: this.selectedDate,
      };

      this.axios
        .post(`${process.env.VUE_APP_API}/create`, mealObject)
        .then(function () {
          self.exit();

          self.$store.dispatch('fetchTodayValues');
          self.$store.dispatch('fetchWeeklyValues');

          self.$store.dispatch('setNotification', {
            value: 'Value added successful.',
            type: 'success'
          });
        })
        .catch(function (error) {
          self.response = error.response.data.message;
        });
    },
    mealSelect(e) {
      this.meal = e.target.dataset.selectorValue;
    },
    mealCategorySelect(e) {
      this.mealCategory = e.target.dataset.value;
    },
    beforeAfterSelect(e) {
      this.beforeAfter = e.target.dataset.selectorValue;
    },
    showDatetimeSelect() {
      this.datetimeSelect
        ? this.datetimeSelect = false
        : this.datetimeSelect = true;
    },
  },
  watch: {
    selectedDate() {
      this.showDatetimeSelect();
    }
  }
};
</script>

<style lang="scss">
@import "~@scss/components/datepicker";
@import "~@scss/blocks/modal";

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.form-group--meal {
    margin-bottom: 20px;
  }

  &.form-group--meal-category {
    margin-bottom: 20px;
  }

  &.form-group--before-after {
    margin-top: 20px;
  }

  &.form-group--value {
    margin-top: 20px;

    .form-input-group {
      position: relative;
      width: 180px;
    }

    .form-input {
      padding-right: 65px;
      box-sizing: border-box;
      text-align: right;
      color: white;
      font-size: 12px;
      font-weight: 600;
    }

    .form-unit {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      color: var(--light-grey);
      font-size: 12px;
      font-weight: 600;
    }
  }

  &.form-group--datetime {
    position: relative;
    margin-top: 20px;

    .form-date-group {
      position: relative;
      width: 180px;
      cursor: pointer;
    }

    .form-control {
      width: 100%;
      padding-right: 50px;
      text-align: right;
      font-size: 12px;
      font-weight: 600;
    }

    .form-date-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      background-color: var(--dark-gray-4);
      border-radius: 8px;

      svg {
        fill: var(--medium-gray-2);
        transform: scale(0.8);
      }
    }
  }

  &.form-group--submit {
    margin-top: 20px;
  }
}

.form-label {
  color: var(--light-gray-2);
  font-size: 14px;
  font-weight: 600;
}

hr {
  border: 0;
  height: 1px;
  background: var(--dark-gray-3);
}

.selector.selector--meal,
.selector.selector--before-after {
  display: flex;
  justify-content: space-between;
  width: 140px;
  height: 41px;
  padding: 6px;
  box-sizing: border-box;
  background: var(--dark-gray);
  border: 1px solid var(--dark-gray-3);
  border-radius: 16px;

  .selector__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--light-grey);
    font-size: 12px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;

    &.active {
      color: white;
      background: var(--selected);
    }
  }
}

.selector.selector--meal-category {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .selector__item {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    &.active {
      .selector__figure {
        position: relative;
        background: var(--dark-gray-2);

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% + 5px);
          height: calc(100% + 5px);
          background: var(--coral-pink);
          border-radius: 14px;
          z-index: -1;
        }
      }

      .selector__checkbox {
        background: var(--selected);
        border-color: var(--selected);
      }
    }
  }

  .selector__figure {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 80px;
    background-color: var(--dark-gray);
    border: 1px solid var(--dark-gray-3);
    border-radius: 14px;
    box-sizing: border-box;

    svg {
      fill: var(--medium-gray);
      width: 22px;
      height: auto;
    }
  }

  .selector__title {
    margin-top: 6px;
    text-align: center;
    color: var(--light-gray-2);
    font-size: 12px;
    font-weight: 600;
  }

  .selector__checkbox {
    display: block;
    width: 16px;
    height: 16px;
    margin-top: 4px;
    border-radius: 8px;
    border: 1px solid var(--dark-gray-3);
    box-sizing: border-box;
    transition: 0.2s;
  }
}
</style>
