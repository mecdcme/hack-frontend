<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Map
        </header>
        <CCardBody>
          <l-map
            :zoom="zoom"
            :center="center"
            style="height: 650px; width: 100%"
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
      </div>
    </div>

    <!-- Marker modal -->
    <CModal :title="modalTitle" :show.sync="markerModal">
      <CTabs variant="tabs" :active-tab="0">
        <CTab title="Main">
          <CDataTable :items="mainItems" :fields="mainFields" hover />
        </CTab>
        <CTab title="Import partners">
          <CDataTable :items="importItems" :fields="importFields" hover />
        </CTab>
        <CTab title="Export partners">
          <CDataTable :items="exportItems" :fields="exportFields" hover />
        </CTab>
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

export default {
  name: "GeoMap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LCircleMarker,
    LTooltip,
    "app-legend": MapLegend
  },
  mixins: [mapMixin],
  data: () => ({
    markerModal: false,
    modalTitle: "",
    mainFields: [
      { key: "name", label: "" },
      { key: "year_2019", label: "2019" },
      { key: "year_2020", label: "2020" }
    ],
    mainItems: [
      { name: "Population", year_2019: "8.858.775", year_2020: "8.901.064" },
      {
        name: "Industrial Production",
        year_2019: "113,39",
        year_2020: "106,15"
      },
      { name: "Unemployment", year_2019: "4.5", year_2020: "5.3" },
      {
        name: "Export",
        year_2019: "159.588.478.070",
        year_2020: "136.215.753.263"
      },
      {
        name: "Import",
        year_2019: "165.008.279.125",
        year_2020: "138.565.863.434"
      }
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
    ...mapGetters("geomap", { markers: "covid" })
  },
  methods: {
    openModal(marker) {
      this.markerModal = true;
      this.modalTitle = marker.name;
    },
    closeModal() {
      this.markerModal = false;
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
