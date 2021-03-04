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
                  Chart goes here
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
//import mobilityMixin from "@/components/mixins/mobility.mixin";

export default {
  name: "Mobility",
  //mixins: [paletteMixin, scatterMixin, sliderMixin],
  data: () => ({
    //Form fields
    countrySelected: null,
    activeTab: 1,
    importFields: [
      { key: "Retail", label: "Retail" },
      { key: "Pharmacy", label: "Pharmacy" },
      { key: "Parks", label: "Parks" },
      { key: "Station", label: "Station" },
      { key: "Workplaces", label: "Workplaces" },
      { key: "Residential", label: "Residential" }
    ],
    mobility: {
      row: ["min", "q1", "med", "avg", "q3", "max"],
      Retail: [-96, -45, -27, -32.8, -11, 5],
      Pharmacy: [-94, -21, -8, -14.6, -2, 46],
      Parks: [-91, -32, -5, 6.3, 46, 198],
      Station: [-91, -50, -36, -38.4, -24, 11],
      Workplaces: [-90, -37, -27, -30.6, -21, 12],
      Residential: [-7, 3, 9, 10.6, 15, 41],
      _row: ["min", "q1", "med", "avg", "q3", "max"]
    }

    /*mobilities: [
      {"Retail": -96, "Pharmacy" : -94, "Parks":  -91, "Station": -91, "Workplaces": -90, "Residential": -7},
      {"Retail":  -45, "Pharmacy" :  -21, "Parks": -32, "Station":  -50, "Workplaces": -37, "Residential": 3},
    ]
    */
  }),
  computed: {
    ...mapGetters("classification", ["countries", "timeNext"]),
    ...mapGetters("mobility", ["mobilities"])
  },
  methods: {
    handleSubmit() {
      if (this.countrySelected) {
        this.$store.dispatch("mobility/findByName", {
          region: this.countrySelected.country,
          subregion: this.countrySelected.country
        });
        this.countryName = this.countrySelected.name;
      }
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Mobility);
    this.$store.dispatch("classification/getCountries");
    this.$store.dispatch("chartjsLine/findByName", {
      region: "Italy",
      subregion: "Italy"
    });
  }
};
</script>
