<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Map
          <div class="card-header-actions">
            <span v-if="loading">Loading...</span>
            <router-link tag="a" :to="{ name: 'Map' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <div>
            <LMap
              @ready="onReady"
              @locationfound="onLocationFound"
              :zoom="zoom"
              :center="center"
            >
              <LTileLayer :url="url"></LTileLayer>

              <ul>
                <li v-for="(l, i) in latlong" :key="i">
                  <LMarker :lat-lng="l"></LMarker>
                </li>
              </ul>
            </LMap>
          </div>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
//import L from 'leaflet';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

const axios = require("axios");
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,

      /*center: latLng(45.861347, 57.405578),*/

      fillColor: "#e4ce7f",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(41.86956082699455, 12.436523437500002),

      zoom: 2,
      center: [13.1367826, 77.5711133],
      bounds: null,
      results: null,
      country: [],
      latlong: [],
      confirmed: []
    };
  },
  methods: {
    onReady(mapObject) {
      mapObject.locate();
    },
    onLocationFound(location) {
      console.log(location);
    }
  },
  created() {
    axios
      .get("https://corona.lmao.ninja/v2/jhucsse")
      .then(r => r["data"])
      .then(data => {
        for (var i = 0; i < 742; i++) {
          if (data[i].country in this.country) {
            continue;
          } else {
            if (
              data[i].coordinates["latitude"] != null &&
              data[i].coordinates["longitude"] != null
            ) {
              var a = [];
              this.country.push(data[i].country);
              a.push(parseFloat(data[i].coordinates["latitude"]));
              a.push(parseFloat(data[i].coordinates["longitude"]));
              this.confirmed.push(data[i].stats["confirmed"]);
              console.log(data[i].country);
              console.log(data[i].coordinates["latitude"]);
              console.log(data[i].coordinates["longitude"]);
              console.log(data[i].stats["confirmed"]);
              this.latlong.push(a);
            }
          }
        }
        console.log(this.latlong);
      });
  }
};
</script>
