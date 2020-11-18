<template>
  <div id="app">
    <l-map
      :center="[-23.752961, -57.854357]"
      :zoom="6"
      style="height: 500px;"
      :options="mapOptions"
    >
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
      <l-choropleth-layer
        :data="pyDepartmentsData"
        titleKey="department_name"
        idKey="department_id"
        :value="value"
        :extraValues="extraValues"
        geojsonIdKey="dpto"
        :geojson="paraguayGeojson"
        :colorScale="colorScale"
      >
        <template slot-scope="props">
          <l-info-control
            :item="props.currentItem"
            :unit="props.unit"
            title="Department"
            placeholder="Hover over a department"
          />
          <l-reference-chart
            title="Girls school enrolment"
            :colorScale="colorScale"
            :min="props.min"
            :max="props.max"
            position="topright"
          />
        </template>
      </l-choropleth-layer>
    </l-map>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from "vue-choropleth";
// eslint-disable-next-line no-unused-vars
import { geojson } from "./data/py-departments-geojson";
import paraguayGeojson from "./data/paraguay.json";
import { pyDepartmentsData } from "./data/py-departments-data";
import { LMap, LGeoJson } from "vue2-leaflet";
//import { LMap, LTileLayer, LControl, LMarker, LGeoJson } from "vue2-leaflet";

export default {
  name: "app",
  components: {
    LMap,
    LGeoJson,
    "l-info-control": InfoControl,
    "l-reference-chart": ReferenceChart,
    "l-choropleth-layer": ChoroplethLayer
  },
  data() {
    return {
      pyDepartmentsData,
      paraguayGeojson,
      colorScale: ["e7d090", "e9ae7b", "de7062"],
      value: {
        key: "amount_w",
        metric: "% girls"
      },
      extraValues: [
        {
          key: "amount_m",
          metric: "% boys"
        }
      ],
      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: "3d3213",
      geojson: null
    };
  },
  async created() {
    this.loading = true;
    const response = await fetch("http://localhost:3000/countries");
    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  }
};
</script>
<style>
@import "../node_modules/leaflet/dist/leaflet.css";
body {
  background-color: #e7d090;
  margin-left: 100px;
  margin-right: 100px;
}

#map {
  background-color: #eee;
}
</style>
