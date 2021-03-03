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
import { mapGetters } from "vuex";
import { Context } from "@/common";
import paletteMixin from "@/components/mixins/palette.mixin";
import ScatterChart from "@/components/charts/ScatterChart";

export default {
  name: "ChartjsScatter",
  components: {
    ScatterChart
  },
  mixins: [paletteMixin],
  data: () => ({
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
        display: true
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
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
    this.$store.dispatch("coreui/setContext", Context.Policy);
    this.$store.dispatch("chartjsScatter/findAll");
  }
};
</script>
