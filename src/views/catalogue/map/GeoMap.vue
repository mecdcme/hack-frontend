<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <CCardBody>
          <l-map
            :zoom="zoom"
            :center="center"
            style="height: 450px; width: 100%"
          >
            <!-- Attribution -->
            <l-tile-layer :url="url" :attribution="attribution" />

            <!-- Circle markers -->
            <l-circle-marker
              v-for="(marker, i) in markers"
              v-bind:key="i"
              :lat-lng="[
                marker.coordinates.latitude,
                marker.coordinates.longitude
              ]"
              :radius="scale(100000)"
              :color="getColor(1000000)"
              :fillColor="getColor(1000000)"
              @click="openModal(marker)"
            >
              <l-tooltip :options="{ interactive: true, permanent: false }">
                <span class="tooltip-span">{{ marker.name }} </span>
              </l-tooltip>
            </l-circle-marker>

            <!-- Legend -->
            <l-control position="topright">
              <app-legend :legend="legend" />
            </l-control>
          </l-map>
        </CCardBody>
        <CCardFooter>
          <vue-slider
            :adsorb="true"
            :tooltip="'none'"
            v-model="periodValue"
            :data="timePeriod"
            :data-value="'id'"
            :data-label="'name'"
            @change="handleCounterChange"
          />
        </CCardFooter>
      </div>
    </div>

    <!-- Marker modal -->
    <CModal :title="modalTitle" :show.sync="markerModal">
      <CTabs variant="tabs" :active-tab="0">
        <CTab title="Main">
          <CDataTable
            :items="micro"
            :fields="mainFields"
            hover
            v-if="markerData"
          />
        </CTab>
        <CTab title="Import partners">
          <CDataTable :items="importItems" :fields="importFields" hover />
        </CTab>
        <!--CTab title="Export partners">
          <CDataTable :items="exportItems" :fields="exportFields" hover />
        </CTab-->
      </CTabs>
      <template #footer>
        <CButton color="outline-primary" square size="sm" @click="closeModal"
          >Close</CButton
        >
      </template>
    </CModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import {
  LMap,
  LTileLayer,
  LControl,
  LTooltip,
  LCircleMarker
} from "vue2-leaflet";

import MapLegend from "@/components/MapLegend";
import mapMixin from "@/components/mixins/map.mixin";
import sliderMixin from "@/components/mixins/slider.mixin";
import VueSlider from "vue-slider-component";

export default {
  name: "GeoMap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LCircleMarker,
    LTooltip,
    "app-legend": MapLegend,
    VueSlider
  },
  mixins: [mapMixin, sliderMixin],
  data: () => ({
    markerModal: false,
    modalTitle: "",
    mainFields: [
      { key: "Year", label: "" },
      { key: "2019", label: "2019" },
      { key: "2020", label: "2020" }
    ],
    importFields: [
      {
        key: "partner_2019"
      },
      { key: "import_2019" },
      { key: "partner_2020" },
      { key: "import_2020" }
    ],
    importItems: [
      {
        partner_2019: "DE",
        import_2019: "55,09%",
        partner_2020: "DE",
        import_2020: "55,09%"
      }
    ]
  }),
  computed: {
    ...mapGetters("geomap", { markers: "geomap", markerData: "markerData" }),
    micro() {
      return this.markerData ? this.markerData[0].MI : [];
    }
  },
  methods: {
    openModal(marker) {
      this.$store.dispatch("geomap/getMarker", marker.country).then(() => {
        this.markerModal = true;
        this.modalTitle = marker.name;
      });
    },
    closeModal() {
      this.markerModal = false;
    },
    handleCounterChange(val) {
      console.log("Slider value: " + val);
    }
  },
  created() {
    this.buildLegend();
    this.$store.dispatch("geomap/findAll");
  }
};
</script>
<style scoped>
@import "~leaflet/dist/leaflet.css";
.card-body {
  padding: 0;
}
.card-footer {
  background-color: #ebedef;
}

/* Modal */
@media (min-width: 576px) {
  .modal-dialog {
    margin: 5rem auto;
  }
}
.modal-footer {
  padding: 0.4rem 0.75rem;
}
.modal-header {
  padding: 0.75rem 1rem;
}
</style>
