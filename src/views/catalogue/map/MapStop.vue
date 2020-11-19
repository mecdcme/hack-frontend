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
          <div id="app">
            <l-map
              style="height: 650px; width: 100%"
              :zoom="zoom"
              :center="center"
              :options="mapOptions"
            >
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-geo-json :geojson="geojson" />
              <l-marker :lat-lng="marker" />
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
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from "vue-choropleth";
// eslint-disable-next-line no-unused-vars
import { geojson } from "./data/provay-departments-geojson";
import paraguayGeojson from "./data/paraguay.json";
import { pyDepartmentsData } from "./data/py-departments-data";
import { latLng } from "leaflet";
import { LMap, LGeoJson } from "vue2-leaflet";
//import { LMap, LTileLayer, LControl, LMarker, LGeoJson } from "vue2-leaflet";

export default {
  name: "geomap",
  components: {
    LMap,
    LGeoJson,
    "l-info-control": InfoControl,
    "l-reference-chart": ReferenceChart,
    "l-choropleth-layer": ChoroplethLayer
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 3,
      center: [45.861347, 57.405578],
      geojson: geojson,
      fillColor: "#e4ce7f",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(41.86956082699455, 12.436523437500002),
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
      currentStrokeColor: "3d3213"
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
@import "~leaflet/dist/leaflet.css";
/*body {
  background-color: #e7d090;
  margin-left: 100px;
  margin-right: 100px;

}
*/

#map {
  background-color: #eee;
}
</style-->
