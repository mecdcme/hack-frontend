/* eslint-disable vue/no-unused-components */ /* eslint-disable
vue/no-unused-components */
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
            <l-map
              :zoom="zoom"
              :center="center"
              style="height: 650px; width: 100%"
            >
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-geo-json
                v-if="show"
                :geojson="geojson"
                :options="options"
                :options-style="styleFunction"
              />
              <l-circle-marker
                v-for="(marker, i) in news"
                v-bind:key="i"
                :lat-lng="[
                  marker.coordinates.latitude,
                  marker.coordinates.longitude
                ]"
                :radius="scale(marker.stats.confirmed)"
                :color="getColor(marker.stats.confirmed)"
                :fillColor="getColor(marker.stats.confirmed)"
              >
                <l-tooltip>
                  {{ marker.country }} <br />
                  {{ marker.county }} <br />
                  {{ marker.province }}<br />
                  confirmed: {{ marker.stats.confirmed }} <br />
                  recovered: {{ marker.stats.recovered }}<br />
                  deaths : {{ marker.stats.deaths }}
                </l-tooltip>
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
              <l-control position="bottomright"
                ><div class="info" v-html="info"></div>
              </l-control>
            </l-map>
          </div>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Map } from "@/common";
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LControl,
  LTooltip,
  LCircleMarker,
  LGeoJson
} from "vue2-leaflet";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LCircleMarker,
    LTooltip,
    LGeoJson
  },
  data() {
    return {
      //states: ["Italia", "Germania"],
      name: "Italia",
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 3,
      center: [45.861347, 57.405578],
      fillColor: "#e4ce7f",
      url: Map.Url,
      attribution: Map.Attribution,
      marker: latLng(41.86956082699455, 12.436523437500002),
      legend: {
        title: null,
        series: [
          {
            color: "",
            fromNumber: "",
            toNumber: ""
          }
        ]
      },
      info: {},
      strokeColor: "fff",
      currentStrokeColor: "4d4d4d",
      strokeWidth: 2,
      currentStrokeWidth: 3,
      optionCircle: {
        color: "",
        radius: "10"
      }
    };
  },
  computed: {
    ...mapGetters("geomap", { geojson: "geomap", news: "covid" }),
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
            "<div> " +
            feature.properties.display_name +
            " </div>" +
            "</div>",
          { permanent: false, sticky: true }
        );
        layer.on({
          mouseover: this.mouseover.bind(this),
          mouseout: this.mouseout.bind(this)
        });
        layer.options.fillColor = this.getColor(feature.properties.pop_est);
        layer.options.color = this.getColor(feature.properties.pop_est);
      };
    }
  },
  methods: {
    scale(d) {
      const min = 1;
      const factor = 5;
      const zoomFactor = this.zoom >= 5 ? 1 : this.zoom / 10; // adjust divisor for best optics
      return Math.floor(Math.log(d) * factor * zoomFactor) + min;
    },
    mouseover: function({ target }) {
      target.setStyle({
        weight: this.currentStrokeWidth,
        color: `#${this.currentStrokeColor}`,
        dashArray: ""
      });
      this.info = this.buildInfo(target.feature);
    },
    mouseout: function({ target }) {
      target.setStyle({
        weight: this.strokeWidth,
        color: `#${this.strokeColor}`,
        dashArray: ""
      });
      this.info = this.buildInfo("");
    },
    buildInfo: function(props) {
      var div = props
        ? "State of " + "<b>" + props.properties.display_name + "</b><br/>"
        : "Hover over a state";
      return div;
    },
    getColor: function(d) {
      return d > 10000000
        ? "#800026"
        : d > 500000
        ? "#BD0026"
        : d > 200000
        ? "#E31A1C"
        : d > 100000
        ? "#FC4E2A"
        : d > 50000
        ? "#FD8D3C"
        : d > 20000
        ? "#FEB24C"
        : d > 10000
        ? "#FED976"
        : "#FFEDA0";
    },
    buildLegend: function() {
      this.legend.title = "State";
      var grades = [10000, 20000, 50000, 100000, 200000, 500000, 1000000],
        from,
        to;

      for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        this.legend.series.push({
          color: this.getColor(from + 1),
          fromNumber: from,
          toNumber: to
        });
      }
    }
  },
  created() {
    this.loading = true;
    this.buildLegend();
    this.info = this.buildInfo("");
    this.$store.dispatch("geomap/findAll");
    //this.$store.dispatch("geomap/findByName", this.name);

    this.loading = false;
  }
};
</script>
<style>
@import "~leaflet/dist/leaflet.css";
.info {
  line-height: 15px;
  color: #555;
  padding: 6px 8px;
  font: 16px/18px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: auto;
  height: auto;
  margin-right: 6px;
  opacity: 0.7;
}
.info h4 {
  margin: 0 0 5px;
  color: #777;
}
.legend {
  line-height: 15px;
  color: #555;
  padding: 6px 8px;
  font: 16px/18px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: auto;
  height: auto;
  margin-right: 6px;
  opacity: 0.7;
}
.legend ul {
  display: block;
  padding-inline-start: 25px !important;
  padding-inline-end: 25px !important;
}
.legend li {
  list-style-type: none;
}
</style>
