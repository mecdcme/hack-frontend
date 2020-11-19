<template>
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
          <div id="app">
            <l-map
              :center="[-23.752961, -57.854357]"
              :zoom="6"
              style="height: 500px;"
              :options="mapOptions"
            >
              <l-choropleth-layer
                :data="pyDepartmentsData"
                titleKey="department_name"
                idKey="department_id"
                :value="value"
                :extraValues="extraValues"
                geojsonIdKey="place_id"
                :geojson="countriesGeojson"
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
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from "vue-choropleth";
// eslint-disable-next-line no-unused-vars
import { geojson } from "./data/osmgeojson-geojson";
import osmgeojson from "./data/osmgeojson.json";
import { pyDepartmentsData } from "./data/py-departments-data";
import { LMap } from "vue2-leaflet";

export default {
  name: "app",
  components: {
    LMap,
    "l-info-control": InfoControl,
    "l-reference-chart": ReferenceChart,
    "l-choropleth-layer": ChoroplethLayer
  },
  data() {
    return {
      pyDepartmentsData,
      osmgeojson,
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
      currentStrokeColor: "3d3213"
    };
  }
};
</script>
<style>
@import "~leaflet/dist/leaflet.css";
#map {
  background-color: #eee;
}
</style>
