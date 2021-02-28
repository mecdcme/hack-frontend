<template>
  <div class="row">
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
            :options="solverOptions"
            placeholder="Solver"
            v-model="solverSelected"
            @input="solverChange"
          />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-9">
      <CCard>
        <CCardHeader>
          Network - Graph
        </CCardHeader>
        <CCardBody>
          <network
            class="network"
            ref="network"
            :nodes="network.nodes"
            :edges="network.edges"
            :options="network.options"
            @select-node="handleSelectNode"
            @select-edge="handleSelectEdge"
          />
        </CCardBody>
      </CCard>
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
    toggleFixed(){
      this.options.nodes.fixed.x = !this.options.physics.enabled;
      this.options.nodes.fixed.y = !this.options.physics.enabled;
    },
    smoothTypeChange() {
      if (this.smoothTypeSelected)
        this.options.edges.smooth.type = this.smoothTypeSelected.value;
    }
  },
  created() {
    this.drawNetwork("201910");
  }
};
</script>

<style>
.events {
  text-align: left;
  height: 50px;
}
.network {
  text-align: center;
  height: 450px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
.card-label {
  color: #321fdb;
  font-size: 0.9em;
}
</style>
