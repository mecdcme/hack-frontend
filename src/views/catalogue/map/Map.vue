<!--template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Map
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'Map' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <l-map style="height: 650px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="markerLatLng"></l-marker>
            <l-geo-json :geojson="geojson"></l-geo-json>
          </l-map>
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 3,
      center: [47.41322, -1.219482],
      markerLatLng: [47.41322, -1.219482],
      geojson: null
    };
  },
  computed: {
    ...mapGetters("geomap", ["geomaps"])
  },
  async created() {
    const response = await this.$store.dispatch("geomaps/findAll");
    this.geojson = await response;
  }
};
</script-->
<template>
  <div>
    <div>
      <span v-if="loading">Loading...</span>
      <label for="checkbox">GeoJSON Visibility</label>
      <input id="checkbox" v-model="show" type="checkbox" />
      <label for="checkboxTooltip">Enable tooltip</label>
      <input id="checkboxTooltip" v-model="enableTooltip" type="checkbox" />
      <input v-model="fillColor" type="color" />
      <br />
    </div>
    <l-map :zoom="zoom" :center="center" style="height: 500px; width: 100%">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
      <l-marker :lat-lng="marker" />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";
export default {
  name: "geomap",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 3,
      center: [45.861347, 57.405578],
      /*center: latLng(45.861347, 57.405578),*/
      geojson: null,
      fillColor: "#e4ce7f",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(41.86956082699455, 12.436523437500002)
    };
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      //const fillColor = getColor(feature.properties.pop_est);
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 0.6
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      //return (feature, layer,style) => {
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>" +
            "<div>" +
            feature.properties.continent +
            " </div>" +
            "<div>" +
            feature.properties.subregion +
            " </div>" +
            "<div> " +
            feature.properties.sovereignt +
            " </div>" +
            "</div>",
          { permanent: false, sticky: true }
        );
        //style.fillColor(getColor(feature.properties.pop_est));
      };
    }
  },
  async created() {
    this.loading = true;
    const response = await fetch("http://localhost:3000/countries");
    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  }
};
/*
function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}
*/
</script>
