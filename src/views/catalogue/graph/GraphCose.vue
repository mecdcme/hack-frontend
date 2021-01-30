<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Graph
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'Map' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody v-if="graphElements">
          <cytoscape
            :config="graphElements"
            :preConfig="preConfig"
            :afterCreated="afterCreated"
          />
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { config } from "@/common/graphCose";

export default {
  name: "GraphCose",
  data() {
    return {
      i: 1
    };
  },
  computed: {
    ...mapGetters("graphCose", ["graphs"]),
    graphElements() {
      return this.graphs
        ? {
            elements: this.graphs,
            ...config
          }
        : null;
    }
  },
  methods: {
    preConfig(cytoscape) {
      console.log("calling pre-config");
      const that = this;
      cytoscape.reset;
      cytoscape(cy => {
        // eslint-disable-next-line no-unused-vars
        cy.on("tap", event => {
          console.log("tapped by", that.i, "time");
          that.i++;
        });
      });
    },
    afterCreated() {
      console.log("after created");
    },
    resetGraph() {
      this.$store.dispatch("graphCose/findAll");
    }
  },
  created() {
    this.$store.dispatch("graphCose/findAll");
  }
};
</script>
