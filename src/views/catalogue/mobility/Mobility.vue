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
                  Data goes here
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
import paletteMixin from "@/components/mixins/palette.mixin";
import scatterMixin from "@/components/mixins/scatter.mixin";
import sliderMixin from "@/components/mixins/slider.mixin";

export default {
  name: "Mobility",
  mixins: [paletteMixin, scatterMixin, sliderMixin],
  data: () => ({
    //Form fields
    countrySelected: null,

    activeTab: 1
  }),
  computed: {
    ...mapGetters("classification", ["countries", "timeNext"]),
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
  methods: {
    handleSubmit() {
      console.log("Submit!");
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Mobility);
    this.$store.dispatch("classification/getCountries");
  }
};
</script>
