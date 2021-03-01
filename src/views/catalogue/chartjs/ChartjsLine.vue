<template>
  <div class="row">
    <div class="col-sm-12 col-md-10">
      <div class="card">
        <header class="card-header">
          {{ countryName }} - Export trade data
        </header>
        <CCardBody>
          <line-chart :chartData="chartData" :options="options" />
        </CCardBody>
      </div>
    </div>
    <div class="col-2">
      <CCard>
        <CCardHeader>
          Data filter
        </CCardHeader>
        <CCardBody>
          <label for="country" class="card-label">Country:</label>
          <v-select
            label="name"
            :options="countries"
            placeholder="Country"
            v-model="countrySelected"
            @input="countryChange"
          />
        </CCardBody>
      </CCard>
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
    countrySelected: {
      country: "IT",
      coordinates: {
        latitude: "41.89277044",
        longitude: "12.48366722"
      },
      name: "Italy"
    },
    countryOptions: [],
    countryName: "Italy",
    options: {
      responsive: true,
      maintainAspectRatio: false,

      title: {
        display: false,
        text: ""
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
  methods: {
    countryChange() {
      if (this.countrySelected) {
        this.$store.dispatch(
          "chartjsLine/findByName",
          this.countrySelected.country
        );
        this.countryName = this.countrySelected.name;
      }
    }
  },
  computed: {
    ...mapGetters("classification", ["countries"]),
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
    this.$store.dispatch("classification/getCountries");
    this.$store.dispatch("chartjsLine/findByName", "IT");
  }
};
</script>

<style scoped>
.card-label {
  color: #321fdb;
  font-size: 0.9em;
}
</style>
