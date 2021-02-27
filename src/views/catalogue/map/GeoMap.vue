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
      <!-- Add trade charts -->
      Trade charts go here!
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
    modalTitle: ""
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
