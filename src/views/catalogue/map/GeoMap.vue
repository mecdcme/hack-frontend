<template>
  <div class="row">
    <div class="col-12">
      <CCard>
        <CCardHeader>
          Map
        </CCardHeader>
        <CCardBody>
          <l-map
            :zoom="zoom"
            :center="center"
            style="height: 650px; width: 100%"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-geo-json
              :geojson="geojson"
              :options="options"
              :options-style="styleFunction"
            />
            <l-marker :lat-lng="marker" />

            <l-control position="topright">
              <div class="legend">
                <CCard>
                  <CCardBody>
                    I am a beautiful legend
                  </CCardBody>
                </CCard>
              </div></l-control
            >
            <l-control position="bottomright">
              <div class="legend">
                <CCard class="text-white bg-success">
                  <CCardBody>
                    I am a wonderful legend
                  </CCardBody>
                </CCard>
              </div></l-control
            >
          </l-map>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Map } from "@/common";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControl, LMarker, LGeoJson } from "vue2-leaflet";

export default {
  name: "GeoMap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LGeoJson,
    LMarker
  },
  data() {
    return {
      enableTooltip: true,
      zoom: 3,
      center: [45.861347, 57.405578],
      url: Map.Url,
      attribution: Map.Attribution,
      marker: latLng(41.86956082699455, 12.436523437500002)
    };
  },
  computed: {
    ...mapGetters("geomap", { geojson: "geomap" }),
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction() {
      return () => {
        return {
          weight: 2,
          opacity: 1,
          fillOpacity: 0.6
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>" +
            "<div>" +
            feature.properties.display_name +
            " </div>" +
            "</div>",
          { permanent: false, sticky: true }
        );
        layer.options.fillColor = "	#2eb85c";
        layer.options.color = "	#2eb85c";
      };
    }
  },
  created() {
    this.$store.dispatch("geomap/findByName", "Italy");
  }
};
</script>
<style>
@import "~leaflet/dist/leaflet.css";
</style>
