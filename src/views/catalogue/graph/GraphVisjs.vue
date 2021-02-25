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
          <div class="row">
            <div class="col-sm-10 col-md-10">
              <div class="row">
                <div class="col-sm-12 col-md-12">
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
                    @stabilization-progress="
                      networkEvent('stabilizationProgress')
                    "
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
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12">
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button class="form-control" @click="drawNetwork('201910')">
                      2019.10
                    </button>

                    <button class="form-control" @click="drawNetwork('201911')">
                      2019.11
                    </button>

                    <button class="form-control" @click="drawNetwork('201912')">
                      2019.12
                    </button>

                    <button class="form-control" @click="drawNetwork('202001')">
                      2020.01
                    </button>

                    <button class="form-control" @click="drawNetwork('202002')">
                      2020.02
                    </button>

                    <button class="form-control" @click="drawNetwork('202003')">
                      2020.03
                    </button>

                    <button class="form-control" @click="drawNetwork('202004')">
                      2020.04
                    </button>

                    <button class="form-control" @click="drawNetwork('202005')">
                      2020.05
                    </button>

                    <button class="form-control" @click="drawNetwork('202006')">
                      2020.06
                    </button>

                    <button class="form-control" @click="drawNetwork('202007')">
                      2020.07
                    </button>

                    <button class="form-control" @click="drawNetwork('202008')">
                      2020.08
                    </button>

                    <button class="form-control" @click="drawNetwork('202009')">
                      2020.09
                    </button>

                    <button class="form-control" @click="drawNetwork('202010')">
                      2020.10
                    </button>

                    <button class="form-control" @click="drawNetwork('202011')">
                      2020.11
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-2 col-md-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Edges</h5>

                  <span class="badge badge-secondary"> smooth </span>
                  <select
                    class="form-control"
                    name="smoothType"
                    id="smoothType"
                    @change="smoothTypeChange(smoothTypeSelected)"
                    v-model="smoothTypeSelected"
                  >
                    <option
                      v-for="(smoothTypeOption, st) in smoothTypeOptions"
                      v-bind:key="st"
                      v-bind:value="smoothTypeOption.value"
                    >
                      {{ smoothTypeOption.text }}</option
                    >
                  </select>
                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Physics</h5>
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      v-model="options.physics.enabled"
                      id="checkbox"
                      class="form-check-input"
                    />
                    <label class="form-check-label" for="checkbox">
                      enabled
                    </label>
                  </div>

                  <span class="badge badge-secondary"> solver </span>

                  <select
                    class="form-control"
                    name="solver"
                    id="solver"
                    @change="solverChange(solverSelected)"
                    v-model="solverSelected"
                  >
                    <option
                      v-for="(solverOption, s) in solverOptions"
                      v-bind:key="s"
                      v-bind:value="solverOption.value"
                    >
                      {{ solverOption.text }}</option
                    >
                  </select>
                </div>
              </div>
            </div>
          </div>

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
import visMixin from "@/components/mixins/vis.mixin";

export default {
  name: "GraphVisjs",
  components: { Network },
  mixins: [visMixin],
  data: () => ({
    networkEvents: "",
    solverSelected: "forceAtlas2Based",
    solverOptions: [
      { text: "barnesHut", value: "sbarnesHutort" },
      { text: "forceAtlas2Based", value: "forceAtlas2Based" },
      { text: "repulsion", value: "repulsion" },
      { text: "hierarchicalRepulsion", value: "hierarchicalRepulsion" }
    ],
    smoothTypeSelected: "continuous",
    smoothTypeOptions: [
      { text: "dynamic", value: "dynamic" },
      { text: "continuous", value: "continuous" },
      { text: "discrete", value: "discrete" },
      { text: "diagonalCross", value: "diagonalCross" },
      { text: "straightCross", value: "straightCross" },
      { text: "horizontal", value: "horizontal" },
      { text: "vertical", value: "vertical" },
      { text: "curvedCW", value: "curvedCW" },
      { text: "curvedCCW", value: "curvedCCW" },
      { text: "cubicBezier", value: "cubicBezier" }
    ]
  }),
  computed: {
    ...mapGetters("graphVisjs", ["nodes", "edges"]),
    network() {
      return this.nodes && this.edges
        ? {
            nodes: this.nodes,
            edges: this.edges,
            options: this.options
          }
        : {
            nodes: [],
            edges: [],
            options: null
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
    drawNetwork(id) {
      //this.$store.dispatch("graphVisjs/clear");
      this.$store.dispatch("graphVisjs/findById", id);
    },
    togglePhysics() {
      this.options.physics = !this.options.physics;
    },
    /*
    toggleConfig() {
      this.options.config.enalbled = !this.options.config.enabled;
    },
    */
    solverChange(solverSelected) {
      this.options.physics.solver = solverSelected;
    },
    smoothTypeChange(smoothTypeSelected) {
      this.options.edges.smooth.type = smoothTypeSelected;
    }
  },
  created() {
    this.drawNetwork("201910");
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
  height: 650px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>
