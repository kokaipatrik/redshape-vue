<template>
  <section class="section section--page section--today">
    <div v-if="hasValues" class="section__content">
      <LineChart
        id="values"
        :title="$t('HBA1C')"
        :hba1c="hba1c"
        :key="this.chart.key"
        :data="this.chartData"
        where="today"
      />
      <div class="section__values">
        <div class="block block--meals">
          <h2 class="block__title">
            {{ $t("Meals") }}
          </h2>
          <div v-if="meals != ''" class="block__content">
            <CardValue
              v-for="meal in meals"
              :key="meal._id"
              :id="meal._id"
              :date="meal.createdAt"
              :title="$t(mealNameById(meal.mealCategory))"
              :values="meal.value"
            />
          </div>
          <div v-else class="block__content">
            <CardNew />
          </div>
        </div>
        <div class="block block--general">
          <h2 class="block__title">
            {{ $t("General") }}
          </h2>
          <div v-if="general != ''" class="block__content">
            <CardValue
              v-for="value in general"
              :key="value._id"
              :id="value._id"
              :date="value.createdAt"
              :values="value.value"
            />
          </div>
          <div v-else class="block__content">
            <CardNew />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="section__content">
      <div class="block block--empty">
        <p class="block__lead">{{ $t("Your day is still empty.") }}</p>
        <CardNew class="block__button" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import values from '@/helpers/values';

import LineChart from '@/components/molecules/charts/Line';
import CardValue from '@/components/molecules/cards/Value';
import CardNew from '@/components/molecules/cards/New';

export default {
  name: 'TodayValues',
  mixins: [values],
  components: {
    LineChart,
    CardValue,
    CardNew,
  },
  data() {
    return {
      chart: {
        key: 0,
      },
    };
  },
  computed: {
    ...mapGetters({
      todayValues: 'getTodayValues',
    }),
    hasValues() {
      if (this.todayValues.length) return true;
      return false;
    },
    chartValues() {
      let values = [];

      this.todayValues.map((v) => {
        if (typeof v.value[0] == 'object') {
          v.value.map((a) => {
            if (a.value) {
              values.push({
                x: this.$moment(a.createdAt),
                y: a.value,
              });
            }
          });
        } else {
          values.push({
            x: this.$moment(v.createdAt),
            y: v.value[0],
          });
        }
      });

      return values;
    },
    chartData() {
      return {
        datasets: [
          {
            label: 'Value',
            data: this.chartValues,
            fill: false,
            pointBackgroundColor: 'rgb(252, 38, 102)',
            borderColor: 'rgb(252, 38, 102)',
            borderWidth: '1',
          },
        ],
      };
    },
    meals() {
      return this.todayValues
        .filter((value) => value.meal)
        .sort((d1, d2) => new Date(d2.createdAt) - new Date(d1.createdAt));
    },
    general() {
      return this.todayValues.filter((value) => !value.meal);
    },
    hba1c() {
      const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
      return average(this.getValues(this.todayValues)).toFixed(1);
    },
  },
  methods: {
    getValues(object) {
      let values = [];
      object.map((v) => {
        if (typeof v.value[0] == 'object') {
          v.value.map((a) => {
            if (a.value) {
              values.push(Number(a.value));
            }
          });
        } else {
          values.push(Number(v.value[0]));
        }
      });

      return values;
    },
  },
  watch: {
    todayValues: function () {
      this.chart.key += 1;
    },
  },
};
</script>
