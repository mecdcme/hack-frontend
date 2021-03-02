<template>
  <div class="row">
    <div class="col-sm-12 col-md-10">
      <div class="card">
        <header class="card-header">
          <span>Trade data 2020</span>
          <span class="float-right text-primary"
            >{{ countryName }} - {{ flow }}</span
          >
        </header>
        <CCardBody>
          <line-chart :chartData="chartData" :options="options" />
        </CCardBody>
      </div>
    </div>
    <div class="col-2">
      <CCard>
        <CCardHeader>
          Trade filter
        </CCardHeader>
        <CCardBody>
          <label for="country" class="card-label">Country:</label>
          <v-select
            label="name"
            :options="countries"
            placeholder="Country"
            v-model="countrySelected"
          />
          <label for="country" class="card-label mt-3">Flows:</label>
          <v-select
            label="descr"
            :options="flows"
            placeholder="Flows"
            v-model="flowSelected"
          />
          <CButton
            color="primary"
            shape="square"
            size="sm"
            @click="handleSubmit"
            class="mt-3"
            >Go!</CButton
          >
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
      name: "Italy"
    },
    flowSelected: { id: 2, descr: "Export" },
    countryName: "Italy",
    flow: "Export",

    //Chart options
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
  computed: {
    ...mapGetters("classification", ["countries", "flows"]),
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
  methods: {
    handleSubmit() {
      if (this.countrySelected && this.flowSelected) {
        this.$store.dispatch("chartjsLine/findByName", {
          name: this.countrySelected.country,
          flow: this.flowSelected.id
        });
        this.countryName = this.countrySelected.name;
        this.flow = this.flowSelected.descr;
      }
    }
  },
  created() {
    this.$store.dispatch("classification/getCountries");
    this.$store.dispatch("chartjsLine/findByName", { name: "IT", flow: 2 });
  }
};
</script>

<style scoped>
.card-label {
  color: #321fdb;
  font-size: 0.9em;
}
</style>
