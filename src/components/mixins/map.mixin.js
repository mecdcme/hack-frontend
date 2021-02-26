import { latLng } from "leaflet";

export default {
  data: () => ({
    enableTooltip: true,
    zoom: 3,
    center: [45.861347, 57.405578],
    fillColor: "#e4ce7f",
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
    },
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }),
  methods: {
    scale(d) {
      const min = 1;
      const factor = 5;
      const zoomFactor = this.zoom >= 5 ? 1 : this.zoom / 10; // adjust divisor for best optics
      return Math.floor(Math.log(d) * factor * zoomFactor) + min;
    },
    mouseover({ target }) {
      target.setStyle({
        weight: this.currentStrokeWidth,
        color: `#${this.currentStrokeColor}`,
        dashArray: ""
      });
      this.info = this.buildInfo(target.feature);
    },
    mouseout({ target }) {
      target.setStyle({
        weight: this.strokeWidth,
        color: `#${this.strokeColor}`,
        dashArray: ""
      });
      this.info = this.buildInfo("");
    },
    callGraph(props) {
      var div = props
        ? "State of " + "<b>" + props.properties.display_name + "</b><br/>"
        : "Hover over a state";
      return div;
    },
    getColor(d) {
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
    buildLegend() {
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
  }
};
