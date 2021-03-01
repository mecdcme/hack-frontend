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
            :tooltip="'none'"
            v-model="periodValue"
            :data="timePeriod"
            :data-value="'id'"
            :data-label="'name'"
            @change="handleCounterChange"
          />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardHeader>
          Graph - filters
        </CCardHeader>
        <CCardBody>
          <label class="card-label">Period</label>
          <v-select
            label="name"
            :options="timePeriod"
            placeholder="Select period"
            v-model="selectedPeriod"
          />
          <CInput
            label="Percentage"
            placeholder="Set percentage"
            class="card-label mt-2"
            v-model="percentage"
          />
          <label class="card-label mt-2">Transport</label>
          <v-select
            label="descr"
            multiple
            :options="transports"
            placeholder="Select transport"
            v-model="transport"
          />
          <label class="card-label mt-2">Product</label>
          <v-select
            label="descr"
            :options="products"
            placeholder="Select a product"
            v-model="product"
          />
          <label class="card-label mt-2">Flows</label>
          <v-select
            label="descr"
            :options="flows"
            placeholder="Select a flow"
            v-model="flow"
          />
          <label class="card-label mt-2">Weights</label>
          <v-select
            label="descr"
            :options="weights"
            placeholder="Weights"
            v-model="weight"
          />
          <CButton
            color="primary"
            shape="square"
            size="sm"
            @click="handleSubmit"
            class="mt-3"
            >Go!</CButton
          >
        </CCardBody>
      </CCard>
    </div>
    <!-- Edge modal -->
    <CModal title="Edge modal" :show.sync="edgeModal">
      <span
        >Are you sure you want to remove trade relation betweew
        {{ sourceNode.label }} - {{ destinationNode.label }}?</span
      >
      <template #footer>
        <CButton color="outline-primary" square size="sm" @click="deleteEdge"
          >Yes</CButton
        >
        <CButton color="outline-primary" square size="sm" @click="closeModal"
          >No</CButton
        >
      </template>
    </CModal>
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
    //Form fields
    selectedPeriod: null,
    percentage: 0,
    transport: null,
    product: null,
    flow: null,
    weight: null,

    //Slider
    periodValue: "201910",
    timePeriod: [
      { id: "201910", name: "Oct 19" },
      { id: "201911", name: "Nov 19" },
      { id: "201912", name: "Dec 19" },
      { id: "202001", name: "Jan 20" },
      { id: "202002", name: "Feb 20" },
      { id: "202003", name: "Mar 20" },
      { id: "202004", name: "Apr 20" },
      { id: "202005", name: "May 20" },
      { id: "202006", name: "Jun 20" },
      { id: "202007", name: "Jul 20" },
      { id: "202008", name: "Aug 20" },
      { id: "202009", name: "Sep 20" },
      { id: "202010", name: "Oct 20" },
      { id: "202011", name: "Nov 20" }
    ],
    edgeModal: false,
    sourceNode: {},
    destinationNode: {}
  }),
  computed: {
    ...mapGetters("graphVisjs", ["nodes", "edges"]),
    ...mapGetters("classification", [
      "transports",
      "products",
      "flows",
      "weights"
    ]),
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
    handleSelectNode(selectedGraph) {
      const selectedId = selectedGraph.nodes[0];
      this.getNode(this.network, selectedId);
    },
    handleSelectEdge(selectedGraph) {
      const selectedId = selectedGraph.edges[0];
      const selectedEdge = this.getEdge(this.network, selectedId);
      this.sourceNode = this.getNode(this.network, selectedEdge.from);
      this.destinationNode = this.getNode(this.network, selectedEdge.to);
      this.edgeModal = true;
    },
    deleteEdge() {
      //Send data to the server
      console.log(
        "I am asking the server to delete connection " +
          this.sourceNode.label +
          " - " +
          this.destinationNode.label
      );
      this.closeModal();
    },
    closeModal() {
      this.edgeModal = false;
    },
    drawNetwork(id) {
      this.$store.dispatch("graphVisjs/findById", id);
    },
    handleCounterChange(val) {
      console.log("Slider value: " + val);
      this.drawNetwork(val);
    },
    handleSubmit() {
      const form = {
        tg_period: this.selectedPeriod.id,
        tg_perc: this.percentage,
        listaMezzi: this.getIds(this.transport),
        product: this.product.id,
        flow: this.flow.id,
        weight_flag: this.weight.descr,
        pos: "None",
        selezioneMezziEdges: "None"
      };
      this.$store.dispatch("graphVisjs/postGraph", form);
    },
    getIds(selectedTransports) {
      var ids = [];
      selectedTransports.forEach(element => {
        ids.push(element.id);
      });
      return ids;
    }
  },
  created() {
    this.$store.dispatch("classification/getTransports");
    this.$store.dispatch("classification/getProducts");
  }
};
</script>

<style scoped>
.network {
  text-align: center;
  height: 550px;
  margin: 5px 0;
}
.card-no-border {
  padding: 0;
  border: none;
}
.card-label {
  color: #321fdb;
  font-size: 0.9em;
}
.vue-slider {
  margin: 2.5rem 1.5rem;
}
</style>
