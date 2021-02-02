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

          <button @click="addNode">Add node</button>
          <button @click="addEdge">Add edge</button>
          <button @click="resetNetwork">Reset Network</button>
          <button @click="removeNode">Remove Node</button>
          <button @click="removeEdge">Remove Edge</button>

          <div class="events">
            <p>
              Network events: <br />
              {{ networkEvents }}
            </p>
          </div>
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
            shape: "circle"
          },
          groups: {
            gbox: { color: { background: "red" }, borderWidth: 3 }
          },
          physics: false
        }
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
    resetNetwork() {
      this.$store.dispatch("demoGraph/findAll");
    },
    removeNode() {
      this.network.nodes.splice(0, 1);
    },
    removeEdge() {
      this.network.edges.splice(0, 1);
    }
  },
  created() {
    this.$store.dispatch("graphVisjs/findAll");
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
