<template>
  <section class="section section--page section--weekly">
    <div
      v-if="hasValues"
      class="section__button">
      <button
        class="btn btn--pdf"
        @click="generateReport">
        {{ $t('Export as PDF') }}
      </button>
    </div>
    <div
      v-if="hasValues"
      class="section__content">
      <LineChart
        id="values"
        :title="$t('HBA1C')"
        :hba1c="5"
        :key="this.chart.key"
        :data="this.chartData"
        where="weekly"
      />
      <div v-if="valuesByDay" class="section__values">
        <div
          class="block block--values-list"
          v-for="(values, index) in valuesByDay"
          :key="values.createdAt"
        >
          <h2 class="block__title">
            {{ index }}
            <span class="hba1c">HBA1C: {{ hba1c(values) }}</span>
          </h2>
          <div class="block__content">
            <CardValue
              v-for="value in values"
              :key="value._id"
              :id="value._id"
              :date="value.createdAt"
              :title="$t(mealNameById(value.mealCategory))"
              :values="value.value"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="section__content">
      <div class="block block--empty">
        <p class="block__lead">{{ $t("Your last 7 days is still empty.") }}</p>
        <CardNew class="block__button" />
      </div>
    </div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1400"
      filename="weekly_values"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section
        class="section section--pdf"
        slot="pdf-content">
        <header class="section__header">
          <div class="section__date">
            <span class="title">Monthly values</span>
            <span class="text">March, 2021</span>
          </div>
          <figure class="section__logo">
          </figure>
          <div class="section__user">
            <span class="text">Patrik Kókai</span>
            <span class="title">Type 1 diabetes</span>
          </div>
        </header>
        <div class="block block--week">
          <div class="block__title">Week 1</div>
          <div class="block__date">March 1 - March 7, 2021</div>
        </div>
        <div class="block block--values">
          <div class="card card--value">
            <div class="card__head">
              <h2 class="card__title">March 1</h2>
              <span class="card__day">Monday</span>
            </div>
            <div class="card__content">
              values
            </div>
          </div>
        </div>
      </section>
    </vue-html2pdf>
  </section>
</template>

<script>

import { mapGetters } from 'vuex';

import VueHtml2pdf from 'vue-html2pdf';

import values from '@/helpers/values';

import LineChart from '@/components/molecules/charts/Line';
import CardValue from '@/components/molecules/cards/Value';
import CardNew from '@/components/molecules/cards/New';

export default {
  name: 'WeeklyValues',
  mixins: [values],
  components: {
    VueHtml2pdf,
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
      weeklyValues: 'getWeeklyValues',
    }),
    hasValues() {
      if (this.weeklyValues.length) return true;
      return false;
    },
    valuesByDay() {
      let values = {};

      this.weeklyValues.filter((value) => {
        const date = this.$moment(value.createdAt).format('LL');

        values[date] ? values[date].push(value) : (values[date] = [value]);
      });

      values = Object.entries(values)
        .sort(([, v1], [, v2]) => v2 - v1)
        .reverse()
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      return values;
    },
    valuesForReport() {
      let values = this.valuesByDay;
      let report = [];

      for (const [key, value] of Object.entries(values)) {
        report.push({
          x: this.$moment(key),
          y: this.hba1c(value),
        });
      }

      return report;
    },
    chartData() {
      return {
        datasets: [
          {
            label: 'Value',
            data: this.valuesForReport,
            fill: false,
            pointBackgroundColor: 'rgb(252, 38, 102)',
            borderColor: 'rgb(252, 38, 102)',
            borderWidth: '1',
          },
        ],
      };
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
    hba1c(day) {
      const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
      return average(this.getValues(day)).toFixed(1);
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
  watch: {
    weeklyValues: function () {
      this.chart.key++;
    },
  },
};
</script>

<style lang="scss" scoped>
.section.section--weekly {
  .section__button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
