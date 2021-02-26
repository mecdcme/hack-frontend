<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          IT − WO @ T + 6 ; TOTAL (mln. euro)
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'Map' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <scatter-chart :chartData="scatterData" :options="options" />
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
import ScatterChart from "@/components/charts/ScatterChart";
import { mapGetters } from "vuex";
export default {
  name: "ChartjsScatter",
  components: {
    ScatterChart
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
          /*yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          */
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              },
              type: "linear",
              position: "bottom"
            }
          ]
        },
        legend: {
          display: false,
          legendPosition: "left"
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
    ...mapGetters("chartjsScatter", ["charts"]),
    scatterData() {
      var scatterData = {};
      scatterData.datasets = [];
      this.charts.forEach(element => {
        console.log(element);
        const color = this.getColor();
        var str = "";
        switch (element.dataname) {
          case "01":
            str = {
              label: element.dataname,
              fill: false,
              backgroundColor: color.background,
              borderColor: color.border,
              data: element.data,
              showLine: false,
              pointRadius: 12
            };
            break;
          case "04":
            str = {
              label: element.dataname,
              fill: false,
              backgroundColor: "red", //color.background,
              borderColor: "red", // color.border,
              data: element.data,
              showLine: true,
              lineTension: 0,
              pointRadius: 0,
              borderDash: [5, 5]
            };
            break;
          case "05":
            str = {
              label: element.dataname,
              fill: false,
              backgroundColor: color.background,
              borderColor: color.border,
              data: element.data,
              showLine: true,
              lineTension: 0,
              pointRadius: 0,
              borderDash: [5, 5]
            };
            break;
          default:
            str = {
              label: element.dataname,
              fill: false,
              backgroundColor: "red", //color.background,
              borderColor: "red", //color.border,
              data: element.data,
              showLine: true,
              lineTension: 0,
              pointRadius: 0
            };
            break;
        }
        scatterData.datasets.push(str);
      });
      this.clearColor();
      return scatterData;
    }
  },
  created() {
    this.$store.dispatch("chartjsScatter/findAll");
  }
};
</script>
