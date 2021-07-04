<template>
  <div class="block block--chart">
    <div class="block__head">
      <div class="block__title">{{ title }}</div>
      <span class="block__average">{{ hba1c }} mmol/l</span>
    </div>
    <canvas :id="this.id"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'LineChart',
  props: ['id', 'title', 'hba1c', 'data', 'where'],
  mounted() {
    this.createChart();
  },
  methods: {
    xAxes() {
      return {
        type: 'time',
        distribution: 'series',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: (this.where == 'weekly') ? 'ddd' : (this.where == 'today') ? 'HH:mm' : '',
          },
        },
        gridLines: {
          color: 'rgb(44, 44, 44)',
        },
      };
    },
    createChart() {
      let ctx = document.getElementById(this.id);
      let chart = new Chart(ctx, {
        type: 'line',
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              this.xAxes()
            ],
            yAxes: [
              {
                gridLines: {
                  color: 'rgb(44, 44, 44)',
                },
              },
            ],
          },
        },
        data: this.data,
      });

      return chart;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss/vars/grid";

.block.block--chart {
  width: 100%;
  height: fit-content;
  padding: 20px 15px 10px;
  margin: 20px 0 35px;
  box-sizing: border-box;
  background-color: var(--black-2);
  border-radius: 14px;

  .block__head {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .block__title {
    margin-left: 6px;
    color: white;
    font-size: 18px;
    font-weight: 700;
  }

  .block__average {
    margin-left: 10px;
    color: var(--medium-gray);
    font-size: 13px;
    font-weight: 600;
  }

  canvas {
    width: 100%;
  }
}

@media (min-width: $xl) {
  .block.block--chart {
    width: 550px;
  }
}
</style>
