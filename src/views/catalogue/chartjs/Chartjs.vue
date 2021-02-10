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
          <div class="small">
            <bar-chart :chartData="chartData" />
          </div>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<!--script>
import { mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "Chartjs",
  components: {
    BarChart
  },
  data() {
    return {
      chartData: {
        labels: [
          "2015-01",
          "2015-02",
          "2015-03",
          "2015-04",
          "2015-05",
          "2015-06",
          "2015-07",
          "2015-08",
          "2015-09",
          "2015-10",
          "2015-11",
          "2015-12"
        ],
        datasets: [
          {
            label: "covid",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            pointBorderColor: "#2554FF",
            data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    ...mapGetters("geomap", { news: "covid" })
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  created() {
    this.$store.dispatch("geomap/findAll");
  }
};
</script-->

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "Chartjs",
  components: {
    BarChart
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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
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
    ...mapGetters("geomap", { covid: "covid" }),
    chartData() {
      var chartData = {};
      chartData.labels = [];
      chartData.datasets = [];

      chartData.labels = ["confirmed", "recovered", "deaths"];

      this.covid.forEach(covid => {
        //chartData.labels.push(covid.province);
        const color = this.getColor();
        chartData.datasets.push({
          label: covid.province,
          backgroundColor: color.background,
          borderColor: color.border,
          borderWidth: 2,
          data: [
            covid.stats.confirmed,
            covid.stats.recovered,
            covid.stats.deaths
          ]
        });
      });

      this.clearColor();
      return chartData;
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  created() {
    this.$store.dispatch("geomap/findAll");
  }
};
</script>
