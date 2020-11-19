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
                <div class="legend">info</div></l-control
              >
              <l-control position="bottomright">
                <div class="legend">legend</div></l-control
              >
            </l-map>
          </div>
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControl, LMarker, LGeoJson } from "vue2-leaflet";

/*
var legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    labels = [],
    from,
    to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' +
        getColor(from + 1) +
        '"></i> ' +
        from +
        (to ? "&ndash;" + to : "+")
    );
  }

  div.innerHTML = labels.join("<br>");
  return div;
};

legend.addTo();

*/
function mouseover({ target }) {
  target.setStyle({
    weight: this.currentStrokeWidth,
    color: `#${this.currentStrokeColor}`,
    dashArray: ""
  });
}

function mouseout({ target }) {
  target.setStyle({
    weight: this.strokeWidth,
    color: `#${this.strokeColor}`,
    dashArray: ""
  });
  this.currentItem = { name: "", value: 0 };
}
function getColor(d) {
  d = d / 2000000;
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

export default {
  name: "geomap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LGeoJson,
    LMarker
  },
  props: {
    strokeColor: { type: String, default: "fff" },
    currentStrokeColor: { type: String, default: "4d4d4d" },
    strokeWidth: { type: Number, default: 2 },
    currentStrokeWidth: { type: Number, default: 3 }
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
            //feature.properties.continent +
            " </div>" +
            "<div>" +
            //feature.properties.subregion +
            " </div>" +
            "<div> " +
            //feature.properties.sovereignt +
            " </div>" +
            "<div> " +
            //feature.properties.pop_est +
            "</div>",
          "</div>",
          { permanent: false, sticky: true }
        );
        layer.on({
          mouseover: mouseover.bind(this),
          mouseout: mouseout.bind(this)
        });

        //click: zoomToFeature

        console.log(
          "Population " +
            feature.properties.pop_est +
            ", color: " +
            getColor(feature.properties.pop_est)
        );
        layer.options.fillColor = getColor(feature.properties.pop_est);
        layer.options.color = getColor(feature.properties.pop_est);
      };
    }
  },
  async created() {
    this.loading = true;
    const response = await fetch("http://localhost:3000/countriesOther");
    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  }
};
</script>
<style>
.legend {
  line-height: 18px;
  color: #555;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
.info {
  padding: 6px 8px;
  font: 18px/20px sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.info h4 {
  margin: 0 0 5px;
  color: #777;
}
</style>
