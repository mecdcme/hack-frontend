<template>
  <div class="row">
    <div class="col-9">
      <div class="card">
        <CCardBody>
          <CTabs variant="tabs" :active-tab="0">
            <CTab>
              <template #title>
                <span>Data</span>
              </template>
              <CCard class="card-no-shadow">
                <CCardBody>
                  <CDataTable
                    :items="mobilities"
                    :fields="importFields"
                    hover
                  />
                </CCardBody>
              </CCard>
            </CTab>
            <CTab>
              <template #title>
                <span>Chart</span>
              </template>
              <CCard class="card-no-shadow">
                <CCardBody>
                  <line-chart :chartData="chartData" :options="options" />
                </CCardBody>
              </CCard>
            </CTab>
          </CTabs>
        </CCardBody>
      </div>
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";
import chartMixin from "@/components/mixins/chart.mixin";
import paletteMixin from "@/components/mixins/palette.mixin";
import LineChart from "@/components/charts/LineChart";

export default {
  name: "Mobility",
  components: {
    LineChart
  },
  mixins: [chartMixin, paletteMixin],
  data: () => ({
    //Form fields
    countrySelected: null,
    activeTab: 1,
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
    ...mapGetters("classification", ["countries", "timeNext"]),
    ...mapGetters("mobility", ["mobilities", "mobilityCharts"]),

    chartData() {
      var chartData = {};       
      chartData.datasets = [];
      //var str;
      this.mobilityCharts.forEach(element => {
        console.log(element);
        //const color = this.getColor();
        /*
        str = {
          type: "line",
          //label: element.dataname,
          fill: false,
          backgroundColor: color.background,
          borderColor: color.border,
          data: element.retail.values,
          showLine: false,
          pointRadius: 12
        };
        chartData.datasets.push(str);
        */
      });
      this.clearColor();
      return chartData;
    }
  },
  methods: {
    handleSubmit() {
      if (this.countrySelected) {
        this.$store.dispatch("mobility/findByName", {
          region: this.countrySelected.name,
          subregion: this.countrySelected.name
        });
        this.countryName = this.countrySelected.name;
      }
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Mobility);
    this.$store.dispatch("classification/getCountries");
    this.$store.dispatch("mobility/findByName", {
      region: "Italy",
      subregion: "Italy"
    });
    this.$store.dispatch("mobility/chartsByName", {
      region: "Italy",
      subregion: "Italy"
    });
  }
};
</script>
