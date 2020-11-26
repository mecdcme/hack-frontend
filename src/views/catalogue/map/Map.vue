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
              <l-marker :lat-lng="marker" />

              <l-control position="topright">
                <div class="legend">
                  <div>{{ legend.title }}</div>
                  <ul class="px-2">
                    <li v-for="row in legend.series" v-bind:key="row.id">
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
                        <div
                          v-if="row.toNumber !== null && row.toNumber !== ''"
                          class="px-0"
                        >
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
import { LMap, LTileLayer, LControl, LMarker, LGeoJson } from "vue2-leaflet";
//import chroma from "chroma-js";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LControl,
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
      /*geojson: null,*/
      fillColor: "#e4ce7f",
      url: Map.Url,
      attribution: Map.Attribution,
      marker: latLng(41.86956082699455, 12.436523437500002),
      legend: {
        title: null,
        series: [
          {
            id: "",
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
      currentStrokeWidth: 3
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
        ? "<h4>State of </h4>" +
          "<b>" +
          props.properties.display_name +
          "</b><br/>"
        : "Hover over a state";
      return div;
    },
    getColor: function(d) {
      //d = d / 2000000;
      return d > 1000000
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
      var grades = [
          0,
          100000,
          200000,
          500000,
          1000000,
          2000000,
          5000000,
          10000000
        ],
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
    this.$store.dispatch("geomap/findByName", "Italy");
    this.buildLegend();
    this.info = this.buildInfo("");
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
  /*display: inline;*/
}
</style>
