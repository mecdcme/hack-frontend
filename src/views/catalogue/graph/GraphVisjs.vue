<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Network - Graph
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'Map' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <network
            class="network"
            ref="network"
            :nodes="network.nodes"
            :edges="network.edges"
            :options="network.options"
            @click="networkEvent('click')"
            @double-click="networkEvent('doubleClick')"
            @oncontext="networkEvent('oncontext')"
            @hold="networkEvent('hold')"
            @release="networkEvent('release')"
            @select="networkEvent('select')"
            @select-node="networkEvent('selectNode')"
            @select-edge="networkEvent('selectEdge')"
            @deselect-node="networkEvent('deselectNode')"
            @deselect-edge="networkEvent('deselectEdge')"
            @drag-start="networkEvent('dragStart')"
            @dragging="networkEvent('dragging')"
            @drag-end="networkEvent('dragEnd')"
            @hover-node="networkEvent('hoverNode')"
            @blur-node="networkEvent('blurNode')"
            @hover-edge="networkEvent('hoverEdge')"
            @blur-edge="networkEvent('blurEdge')"
            @zoom="networkEvent('zoom')"
            @show-popup="networkEvent('showPopup')"
            @hide-popup="networkEvent('hidePopup')"
            @start-stabilizing="networkEvent('startStabilizing')"
            @stabilization-progress="networkEvent('stabilizationProgress')"
            @stabilization-iterations-done="
              networkEvent('stabilizationIterationsDone')
            "
            @stabilized="networkEvent('stabilized')"
            @resize="networkEvent('resize')"
            @init-redraw="networkEvent('initRedraw')"
            @before-drawing="networkEvent('beforeDrawing')"
            @after-drawing="networkEvent('afterDrawing')"
            @animation-finished="networkEvent('animationFinished')"
            @config-change="networkEvent('configChange')"
            @nodes-mounted="networkEvent('nodes-mounted')"
            @nodes-add="networkEvent('nodes-add')"
            @nodes-update="networkEvent('nodes-update')"
            @nodes-remove="networkEvent('nodes-remove')"
            @edges-mounted="networkEvent('edges-mounted')"
            @edges-add="networkEvent('edges-add')"
            @edges-update="networkEvent('edges-update')"
            @edges-remove="networkEvent('edges-remove')"
          >
          </network>

          <!--button @click="addNode">Add node</button>
          <button @click="addEdge">Add edge</button>
          <button @click="removeNode">Remove Node</button>
          <button @click="removeEdge">Remove Edge</button-->

          <button @click="drawNetwork('1')">1</button>
          <button @click="drawNetwork('2')">2</button>
          <button @click="drawNetwork('3')">3</button>

          <!--div class="events">
            <p>
              Network events: <br />
              {{ networkEvents }}
            </p>
          </div-->
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { Network } from "vue-visjs";
import { mapGetters } from "vuex";

export default {
  name: "GraphVisjs",
  components: { Network },

  data: () => ({
    networkEvents: ""
  }),
  computed: {
    ...mapGetters("graphVisjs", ["nodes", "edges"]),
    network() {
      return {
        nodes: this.nodes,
        edges: this.edges,
        options: {
          nodes: {
            borderWidth: 1,
            borderWidthSelected: 2,
            brokenImage: undefined,
            chosen: true,
            color: {
              border: "#2B7CE9",
              background: "#97C2FC",
              highlight: {
                border: "#2B7CE9",
                background: "#D2E5FF"
              },
              hover: {
                border: "#2B7CE9",
                background: "#D2E5FF"
              }
            },
            opacity: 1,
            fixed: {
              x: false,
              y: false
            },
            font: {
              color: "#343434",
              size: 14, // px
              face: "arial",
              background: "none",
              strokeWidth: 0, // px
              strokeColor: "#ffffff",
              align: "center",
              multi: false,
              vadjust: 0,
              bold: {
                color: "#343434",
                size: 14, // px
                face: "arial",
                vadjust: 0,
                mod: "bold"
              },
              ital: {
                color: "#343434",
                size: 14, // px
                face: "arial",
                vadjust: 0,
                mod: "italic"
              },
              boldital: {
                color: "#343434",
                size: 14, // px
                face: "arial",
                vadjust: 0,
                mod: "bold italic"
              },
              mono: {
                color: "#343434",
                size: 15, // px
                face: "courier new",
                vadjust: 2,
                mod: ""
              }
            },
            group: undefined,
            heightConstraint: false,
            hidden: false,
            icon: {
              face: "FontAwesome",
              code: undefined,
              weight: undefined,
              size: 50, //50,
              color: "#2B7CE9"
            },
            image: undefined,
            imagePadding: {
              left: 0,
              top: 0,
              bottom: 0,
              right: 0
            },
            label: undefined,
            labelHighlightBold: true,
            level: undefined,
            mass: 1,
            physics: true,
            scaling: {
              min: 10,
              max: 30,
              label: {
                enabled: false,
                min: 14,
                max: 30,
                maxVisible: 30,
                drawThreshold: 5
              },
              customScalingFunction: function(min, max, total, value) {
                if (max === min) {
                  return 0.5;
                } else {
                  let scale = 1 / (max - min);
                  return Math.max(0, (value - min) * scale);
                }
              }
            },
            shadow: {
              enabled: false,
              color: "rgba(0,0,0,0.5)",
              size: 10,
              x: 5,
              y: 5
            },
            shape: "ellipse",
            shapeProperties: {
              borderDashes: false, // only for borders
              borderRadius: 6, // only for box shape
              interpolation: false, // only for image and circularImage shapes
              useImageSize: false, // only for image and circularImage shapes
              useBorderWithImage: false, // only for image shape
              coordinateOrigin: "center" // only for image and circularImage shapes
            },
            size: 25,
            title: undefined,
            value: undefined,
            widthConstraint: false,
            x: undefined,
            y: undefined
          },
          edges: {
            arrows: {
              to: {
                enabled: true,
                imageHeight: undefined,
                imageWidth: undefined,
                scaleFactor: 1,
                src: undefined,
                type: "arrow"
              },
              middle: {
                enabled: true,
                imageHeight: undefined,
                imageWidth: undefined,
                scaleFactor: 1,
                src: undefined,
                type: "arrow"
              },
              from: {
                enabled: true,
                imageHeight: undefined,
                imageWidth: undefined,
                scaleFactor: 1,
                src: undefined,
                type: "arrow"
              }
            },
            endPointOffset: {
              from: 0,
              to: 0
            },
            arrowStrikethrough: true,
            chosen: true,
            color: {
              color: "#848484",
              highlight: "#848484",
              hover: "#848484",
              inherit: "from",
              opacity: 1.0
            },
            dashes: false,
            font: {
              color: "#343434",
              size: 14, // px
              face: "arial",
              background: "none",
              strokeWidth: 2, // px
              strokeColor: "#ffffff",
              align: "horizontal",
              multi: false,
              vadjust: 0,
              bold: {
                color: "#343434",
                size: 14, // px
                face: "arial",
                vadjust: 0,
                mod: "bold"
              },
              ital: {
                color: "#343434",
                size: 14, // px
                face: "arial",
                vadjust: 0,
                mod: "italic"
              },
              boldital: {
                color: "#343434",
                size: 14, // px
                face: "arial",
                vadjust: 0,
                mod: "bold italic"
              },
              mono: {
                color: "#343434",
                size: 15, // px
                face: "courier new",
                vadjust: 2,
                mod: ""
              }
            },
            hidden: false,
            hoverWidth: 1.5,
            label: undefined,
            labelHighlightBold: true,
            length: undefined,
            physics: true,
            scaling: {
              min: 1,
              max: 15,
              label: {
                enabled: true,
                min: 14,
                max: 30,
                maxVisible: 30,
                drawThreshold: 5
              },
              customScalingFunction: function(min, max, total, value) {
                if (max === min) {
                  return 0.5;
                } else {
                  var scale = 1 / (max - min);
                  return Math.max(0, (value - min) * scale);
                }
              }
            },
            selectionWidth: 1,
            selfReferenceSize: 20,
            selfReference: {
              size: 20,
              angle: Math.PI / 4,
              renderBehindTheNode: true
            },
            shadow: {
              enabled: false,
              color: "rgba(0,0,0,0.5)",
              size: 10,
              x: 5,
              y: 5
            },
            smooth: {
              enabled: true,
              type: "dynamic",
              roundness: 0.5
            },
            title: undefined,
            value: undefined,
            width: 1,
            widthConstraint: false
          },
          groups: {
            europa: { color: { background: "red" }, borderWidth: 2 },
            africa: { color: { background: "yellow" }, borderWidth: 2 }
          },
          physics: false
        },
        main: "A really simple example"
      };
    }
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
    },
    addNode() {
      const id = new Date().getTime();
      this.network.nodes.push({ id, label: "New node" });
      // this.$refs.network.network.body.emitter.emit("_dataChanged");
    },
    addEdge() {
      const n1 = Math.floor(Math.random() * this.network.nodes.length);
      const n2 = Math.floor(Math.random() * this.network.nodes.length);
      this.network.edges.push({
        id: `${this.network.nodes[n1].id}-${this.network.nodes[n2].id}`,
        from: this.network.nodes[n1].id,
        to: this.network.nodes[n2].id
      });
    },
    removeNode() {
      this.network.nodes.splice(0, 1);
    },
    removeEdge() {
      this.network.edges.splice(0, 1);
    },
    drawNetwork(n) {
      this.$store.dispatch("graphVisjs/findAll", "/visjsData" + n);
    }
  },
  created() {
    this.drawNetwork("1");
  }
};
</script>

<style>
/* @import "~vue-visjs/dist/vue-visjs.css"; */
* {
  font-family: sans-serif;
}
.events {
  text-align: left;
  height: 50px;
}
.network {
  text-align: center;
  height: 520px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>
