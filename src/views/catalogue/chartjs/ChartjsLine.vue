<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Chartjs
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'Map' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <line-chart :chartData="chartData" :options="options" />
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
import chartMixin from "@/components/mixins/chart.mixin";
import paletteMixin from "@/components/mixins/palette.mixin";
import LineChart from "@/components/charts/LineChart";
import { mapGetters } from "vuex";
export default {
  name: "ChartjsLine",
  components: {
    LineChart
  },
  mixins: [chartMixin, paletteMixin],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,

      title: {
        display: true,
        text: "ITALY"
      },
      tooltips: {
        mode: "index",
        intersect: true
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Time"
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              min: -100,
              max: 200
              //,
              //stepSize: 15
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value"
            }
          }
        ]
      }
    }
  }),
  computed: {
    ...mapGetters("chartjsLine", ["charts"]),
    chartData() {
      var chartData = {};
      chartData.datasets = [];
      //chartData.labels = [];
      chartData.labels = this.months;
      if (this.charts) {
        this.charts.data.forEach(element => {
          const color = this.getColor();
          //chartData.labels.push(element.dataname);
          chartData.datasets.push({
            label: element.dataname,
            fill: false,
            backgroundColor: color.background,
            borderColor: color.border,
            data: element.value,
            //showLine: true,
            pointRadius: 3
          });
        });
      }
      this.clearColor();
      return chartData;
    }
  },
  created() {
    this.$store.dispatch("chartjsLine/findByName", "AT");
  }
};
</script>
