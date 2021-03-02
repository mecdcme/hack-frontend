import { latLng } from "leaflet";

export default {
  data: () => ({
    enableTooltip: true,
    zoom: 4,
    center: [45.861347, 57.405578],
    fillColor: "#e4ce7f",
    marker: latLng(41.89277044, 12.48366722),
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
    /*
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
    */
    /*1 steel blue	#4682B4	(70,130,180)
      2 corn flower blue	#6495ED	(100,149,237)
      3 deep sky blue	#00BFFF	(0,191,255)
      4 dodger blue #1E90FF	(30,144,255)
      5 light blue	#ADD8E6	(173,216,230)
      6 sky blue	#87CEEB	(135,206,235)
      7 light sky blue	#87CEFA	(135,206,250)
      */

    getColor(d) {
      return d > 15
        ? "#4682B4"
        : d > 10
        ? "#6495ED"
        : d > 5
        ? "#00BFFF"
        : d > 3
        ? "#ADD8E6"
        : d > 2
        ? "#87CEFA"
        : d > 1
        ? "#1E90FF"
        : d < -15
        ? "#800026"
        : d < -10
        ? "#BD0026"
        : d < -5
        ? "#E31A1C"
        : d < -3
        ? "#FC4E2A"
        : d < -2
        ? "#FD8D3C"
        : d < -1
        ? "#FED976"
        : "#FFEDA0";
    },
    buildLegend() {
      this.legend.title = "Trade";
      var grades = [
          15,
          10,
          5,
          3,
          2,
          1,
          0,
          
          -15,
          -10,
          -5,
          -3,
          -2,
          -1
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
    /*
    buildLegend() {
      this.legend.title = "Trade";
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
    */
  }
};
