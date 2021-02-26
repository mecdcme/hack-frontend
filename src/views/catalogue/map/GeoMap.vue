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
            <l-tile-layer :url="url" :attribution="attribution" />
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
            >
              <l-tooltip :options="{ interactive: true, permanent: false }">
                <span class="tooltip-span">{{ marker.name }} </span>
              </l-tooltip>
              <l-popup>
                <br />
                {{ marker.country }}
                {{ marker.name }} <br />

                <br />
                <span
                  @click="callGraph(marker)"
                  style="color:blue;cursor:pointer"
                  >more...</span
                >
                <br />
              </l-popup>
            </l-circle-marker>
            <l-control position="topright">
              <div class="legend">
                <div>{{ legend.title }}</div>
                <ul class="px-2">
                  <li v-for="(row, r) in legend.series" v-bind:key="r">
                    <div class="row px-0">
                      <span
                        class="px-1"
                        v-bind:style="{
                          height: '15px',
                          width: '15px',
                          backgroundColor: row.color
                        }"
                      >
                      </span>
                      <div class="px-1 text-right">
                        {{ row.fromNumber }}
                      </div>
                      <div v-show="row.toNumber" class="px-0">
                        <b>:</b>
                      </div>
                      <div class="px-1 text-left">
                        {{ row.toNumber }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </l-control>
          </l-map>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import {
  LMap,
  LTileLayer,
  LControl,
  LTooltip,
  LPopup,
  LCircleMarker
} from "vue2-leaflet";

import mapMixin from "@/components/mixins/map.mixin";

export default {
  name: "GeoMap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LCircleMarker,
    LTooltip,
    LPopup
  },
  mixins: [mapMixin],
  computed: {
    ...mapGetters("geomap", { markers: "covid" })
  },
  methods: {
    callGraph(marker) {
      console.log(marker.name);
    }
  },
  created() {
    this.buildLegend();
    this.$store.dispatch("geomap/findAll");
  }
};
</script>
<style>
@import "~leaflet/dist/leaflet.css";
</style>
