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
import LineChart from "@/components/charts/LineChart";
import { mapGetters } from "vuex";
export default {
  name: "ChartjsLine",
  components: {
    LineChart
  },
  data() {
    return {
      currentColor: 0,
      colorPalette: [
        {
          border: "rgba(46, 184, 92, 1)", //green
          background: "rgba(46, 184, 92, 0.2)"
        },
        {
          border: "rgba(50, 31, 219, 1)", //blue
          background: "rgba(50, 31, 219, 0.2)"
        },
        {
          border: "rgba(229, 83, 83, 1)", //red
          background: "rgba(229, 83, 83, 0.2)"
        },
        {
          border: "rgba(249, 177, 21, 1)", //orange
          background: "rgba(249, 177, 21, 0.2)"
        },
        {
          border: "rgba(51, 153, 255, 1)", //cyan
          background: "rgba(51, 153, 255, 0.2)"
        },
        {
          border: "rgba(206, 210, 216, 1)", //gray
          background: "rgba(206, 210, 216, 0.2)"
        }
      ],
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value"
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    getColor() {
      this.currentColor =
        this.currentColor >= this.colorPalette.length - 1
          ? 0
          : this.currentColor;
      const color = this.colorPalette[this.currentColor];
      this.currentColor++;
      return color;
    },
    clearColor() {
      this.currentColor = 0;
    }
  },
  computed: {
    ...mapGetters("chartjsLine", ["charts"]),
    chartData() {
      var chartData = {};
      chartData.datasets = [];
      chartData.labels = [];

      if (this.charts) {
        this.charts.data.forEach(element => {
          const color = this.getColor();
          //chartData.labels.push(element.dataname);
          chartData.datasets.push({
            label: element.dataname,
            fill: false,
            backgroundColor: color.background,
            borderColor: color.border,
            data: element.data,
            //showLine: true,
            pointRadius: 5
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
