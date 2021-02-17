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
            </div>
            <div class="col-sm-2 col-md-2">
              <button class="form-control" @click="drawNetwork('11')">
                Aprile 2019
              </button>
              <button class="form-control" @click="drawNetwork('12')">
                Aprile 2020
              </button>

              <!--button class="form-control" @click="toggleConfig">
                Toggle config
              </button-->

              <button class="form-control" @click="togglePhysics">
                Toggle physics
              </button>
              <select
                class="form-control"
                name="solver"
                id="solver"
                @change="solverChange(solverSelected)"
                v-model="solverSelected"
              >
                <option
                  v-for="(option, o) in solverOptions"
                  v-bind:key="o"
                  v-bind:value="option.value"
                >
                  {{ option.text }}</option
                >
              </select>
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
    }
  },
  created() {
    this.drawNetwork(11);
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
