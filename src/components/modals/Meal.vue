<template>
  <div class="block block--modal block--meal">
    <div class="block__backdrop" @click="exit"></div>
    <div class="block__content">
      <div class="block__right">
        <button type="button" class="block__exit" @click="exit">
          <ExitIcon />
        </button>
      </div>
      <div v-if="isMeal()" class="block__title">
        {{ title }}
      </div>
      <div v-else class="block__title">
        {{ $moment(date).format("LT") }}
      </div>
      <div v-if="isMeal()" class="form form--meal">
        <form @submit.prevent="updateValues">
          <div v-for="(value, key, index) in valuesByType" :key="index">
            <div class="form-group form-group--value">
              <div class="form-label">
                <label>{{ $t(label(key)) }}</label>
              </div>
              <div class="form-content">
                <div
                  v-if="model(key) == 'before'"
                  class="form-input-group">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    autocomplete="off"
                    class="form-input form-control"
                    name="value"
                    v-model="before" />
                  <span class="form-unit">mmol/l</span>
                </div>
                <div
                  v-if="model(key) == 'after'"
                  class="form-input-group">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    autocomplete="off"
                    class="form-input form-control"
                    name="value"
                    v-model="after" />
                  <span class="form-unit">mmol/l</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group form-group--submit">
            <button type="submit" class="btn btn--primary">
              {{ $t("Save") }}
            </button>
          </div>
        </form>
      </div>
      <div v-else class="block block--form">
        <form @submit.prevent="updateValue">
          <div class="form-group form-group--value">
            <div class="form-label">
              <label>{{ $t('Value') }}</label>
            </div>
            <div class="form-content">
              <div class="form-input-group">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  autocomplete="off"
                  class="form-input form-control"
                  name="value"
                  v-model="singleValue" />
                <span class="form-unit">mmol/l</span>
              </div>
            </div>
          </div>
          <div class="form-group form-group--submit">
            <button type="submit" class="btn btn--primary">
              {{ $t("Save") }}
            </button>
          </div>
        </form>
      </div>
      <div class="card card--danger-zone">
        <div class="card__title">
          {{ $t("Danger zone") }}
        </div>
          <button
            @click="deleteValue"
            class="btn btn--secondary">{{ $t('Delete') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import values from '@/helpers/values';

import ExitIcon from '@/assets/svg/exit.svg';

export default {
  name: 'Meal',
  mixins: [values],
  data() {
    return {
      before: '',
      after: '',
      singleValue: '',
    }
  },
  components: {
    ExitIcon,
  },
  props: ['showModal', 'id', 'date', 'title', 'values'],
  created() {
    if (!this.isMeal()) this.singleValue = this.values[0];
  },
  computed: {
    valuesByType() {
      let self = this;
      let values = {};
      values['before'] = '';
      values['after'] = '';

      if (this.isMeal()) {
        this.values.forEach((value) => {
          if (value.type == 'before') {
            values['before'] = value.value;
            self.before = value.value;
          }
          else {
            values['after'] = value.value;
            self.after = value.value;
          }
        });
      }

      return values;
    },
  },
  methods: {
    exit() {
      this.$emit('showModal', false);
    },
    isMeal() {
      return Object.prototype.hasOwnProperty.call(this.values[0], 'type')
        ? true
        : false;
    },
    label(type) {
      if (type == 'before') return 'Before value';
      return 'After value';
    },
    model(type) {
      if (type == 'before') return 'before';
      return 'after';
    },
    updateValues() {
      let self = this;
      let values = {
        beforeValue: self.before,
        afterValue: self.after,
        date: new Date(),
      };

      this.axios
        .post(`${process.env.VUE_APP_API}/update-values/${self.id}`, values)
        .then(() => {
          self.$store.dispatch('setNotification', {
            value: 'Update was successful.',
            type: 'success'
          });

          self.$store.dispatch('fetchTodayValues');
          self.$store.dispatch('fetchWeeklyValues');

          self.exit();
        })
        .catch((err) => {
          console.log('Some error', err);
        });
    },
    updateValue() {
      let self = this;
      let values = {
        value: self.singleValue,
      };

      this.axios
        .post(`${process.env.VUE_APP_API}/update-value/${self.id}`, values)
        .then(() => {
          self.$store.dispatch('setNotification', {
            value: 'Update was successful.',
            type: 'success'
          });

          self.$store.dispatch('fetchTodayValues');
          self.$store.dispatch('fetchWeeklyValues');

          self.exit();
        })
        .catch((err) => {
          console.log('Some error', err);
        });
    },
    deleteValue() {
      let self = this;

      this.axios
        .delete(`${process.env.VUE_APP_API}/delete/${self.id}`)
        .then(() => {
          self.$store.dispatch('setNotification', {
            value: 'Delete was successful.',
            type: 'success'
          });

          self.$store.dispatch('fetchTodayValues');
          self.$store.dispatch('fetchWeeklyValues');

          self.exit();
        })
        .catch((err) => {
          console.log('Some error', err);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss/blocks/modal";
</style>
