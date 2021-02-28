<template>
  <div class="row">
    <div class="col-9">
      <CCard>
        <CCardBody class="card-no-border">
          <network
            class="network"
            ref="network"
            :nodes="network.nodes"
            :edges="network.edges"
            :options="network.options"
            @select-node="handleSelectNode"
            @select-edge="handleSelectEdge"
          />
          <vue-slider
            :adsorb="true"
            v-model="counter"
            :interval="10"
            :marks="true"
            @change="handleCounterChange"
          />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardHeader>
          Graph - properties
        </CCardHeader>
        <CCardBody>
          <label for="smooth" class="card-label">Edges</label>
          <v-select
            label="text"
            :options="smoothTypeOptions"
            placeholder="Edges type"
            v-model="smoothTypeSelected"
            @input="smoothTypeChange"
          />
          <label for="smooth" class="card-label mt-3">Physics</label>
          <CInputCheckbox
            label="Physics"
            :checked.sync="options.physics.enabled"
            @update:checked="toggleFixed"
          />
          <v-select
            v-if="options.physics.enabled"
            label="text"
            class="mt-2"
            :options="solverOptions"
            placeholder="Solver"
            v-model="solverSelected"
            @input="solverChange"
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Graph - filters
        </CCardHeader>
        <CCardBody>
          <label for="smooth" class="card-label">Transport</label>
          <br />
          <label for="smooth" class="card-label mt-3">Product</label>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>

<script>
import { Network } from "vue-visjs";
import { mapGetters } from "vuex";
import visMixin from "@/components/mixins/vis.mixin";
import VueSlider from "vue-slider-component";

export default {
  name: "GraphVisjs",
  components: { Network, VueSlider },
  mixins: [visMixin],
  data: () => ({
    counter: 0
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
    handleSelectNode(graph) {
      const selectedId = graph.nodes[0];
      const selectedNode = this.network.nodes.find(node => {
        return node.id == selectedId;
      });
      console.log("Selected node: " + selectedNode.label);
    },
    handleSelectEdge(graph) {
      const selectedId = graph.edges[0];
      const selectedEdge = this.network.edges.find(edge => {
        return edge.id == selectedId;
      });
      console.log("From: " + selectedEdge.from + ", To: " + selectedEdge.to);
    },
    drawNetwork(id) {
      this.$store.dispatch("graphVisjs/findById", id);
    },
    solverChange() {
      if (this.solverSelected) {
        this.options.physics.solver = this.solverSelected.value;
      }
    },
    toggleFixed() {
      this.options.nodes.fixed.x = !this.options.physics.enabled;
      this.options.nodes.fixed.y = !this.options.physics.enabled;
    },
    smoothTypeChange() {
      if (this.smoothTypeSelected)
        this.options.edges.smooth.type = this.smoothTypeSelected.value;
    },
    handleCounterChange(val) {
      console.log("Slider value: " + val);
      //Now you can draw the network
    },
  },
  created() {
    this.drawNetwork("201910");
  }
};
</script>

<style scoped>
.events {
  text-align: left;
  height: 50px;
}
.network {
  text-align: center;
  height: 400px;
  margin: 5px 0;
}
.card-no-border {
  padding: 0;
}
.card-label {
  color: #321fdb;
  font-size: 0.9em;
}
.vue-slider {
  margin: 2.5rem 1.5rem;
}
</style>
