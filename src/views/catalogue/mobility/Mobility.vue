<template>
  <div class="row">
    <div class="col-9">
      <CCard>
        <CCardBody>
          <CDataTable :items="mobilities" :fields="importFields" hover />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <line-chart :chartData="chartData" :options="options" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardHeader>
          Mobility filter
        </CCardHeader>
        <CCardBody>
          <label for="country" class="card-label">Country:</label>
          <v-select
            label="name"
            :options="countries"
            placeholder="Country"
            v-model="countrySelected"
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
      <CCard>
        <CCardHeader>
          Chart filter
        </CCardHeader>
        <CCardBody>
          <label for="country" class="card-label">Mobility type:</label>
          <v-select
            label="name"
            :options="mobilityTypes"
            placeholder="Mobility type"
            v-model="mobilitySelected"
          />
          <CButton
            color="primary"
            shape="square"
            size="sm"
            @click="handleSelectChart"
            class="mt-3"
            >Go!</CButton
          >
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";
import mobilityMixin from "@/components/mixins/mobility.mixin";
import LineChart from "@/components/charts/LineChart";
import chartMixin from "@/components/mixins/chart.mixin";

export default {
  name: "Mobility",
  components: {
    LineChart
  },
  mixins: [mobilityMixin, chartMixin],
  data: () => ({
    //Form fields
    countrySelected: null,
    mobilitySelected: {
      id: 1,
      name: "Retail",
      descr: "Retail"
    },

    //Chart data
    chartData: null,

    //Table fields
    importFields: [
      { key: "row", label: "" },
      { key: "Retail", label: "Retail" },
      { key: "Pharmacy", label: "Pharmacy" },
      { key: "Parks", label: "Parks" },
      { key: "Station", label: "Station" },
      { key: "Workplaces", label: "Workplaces" },
      { key: "Residential", label: "Residential" }
    ]
  }),
  computed: {
    ...mapGetters("classification", ["countries", "timeNext", "mobilityTypes"]),
    ...mapGetters("mobility", ["mobilities", "mobilityCharts"])
  },
  methods: {
    handleSubmit() {
      if (this.countrySelected) {
        this.$store.dispatch("mobility/findByName", {
          region: this.countrySelected.name,
          subregion: this.countrySelected.name
        });
        this.$store.dispatch("mobility/chartsByName", {
          region: this.countrySelected.name,
          subregion: this.countrySelected.name
        });
        this.countryName = this.countrySelected.name;
      }
    },
    handleSelectChart() {
      if (this.mobilitySelected) {
        this.chartData = this.getChart(
          this.mobilityCharts,
          this.mobilitySelected
        );
      }
    },
    getChart(mobilityCharts, chartType) {
      var chartData = {};
      chartData.datasets = [];
      chartData.labels = mobilityCharts[chartType.name].Date;
      chartData.datasets.push({
        type: "bar",
        label: chartType.descr,
        fill: false,
        backgroundColor: "#06188a",
        borderColor: "#06188a",
        data: mobilityCharts[chartType.name].Values,
        showLine: false,
        pointRadius: 3
      });
      chartData.datasets.push({
        type: "line",
        label: chartType.descr + " smooth",
        fill: false,
        backgroundColor: "red", //color.background,
        borderColor: "red", //color.border,
        data: mobilityCharts[chartType.name].Smooth,
        showLine: true,
        pointRadius: 0
      });
      return chartData;
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Mobility);
    this.$store.dispatch("classification/getCountries");
    this.$store.dispatch("mobility/findByName", {
      region: "Italy",
      subregion: "Italy"
    });
    this.$store
      .dispatch("mobility/chartsByName", {
        region: "Italy",
        subregion: "Italy"
      })
      .then(() => {
        this.chartData = this.getChart(
          this.mobilityCharts,
          this.mobilitySelected
        );
      });
  }
};
</script>
