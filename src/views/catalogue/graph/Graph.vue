<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="card">
          <header class="card-header">
            Graph
            <div class="card-header-actions">
              <span v-if="loading">Loading...</span>
              <router-link tag="a" :to="{ name: 'Map' }">
                <add-icon />
              </router-link>
            </div>
          </header>
          <CCardBody>
            <div id="app">
              <cytoscape
                ref="cyRef"
                :config="config"
                :afterCreated="afterCreated"
              >
                <cy-element
                  v-for="def in elements"
                  v-bind:key="def.data.id"
                  :definition="def"
                />
              </cytoscape>
            </div>
          </CCardBody>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { Component, Vue } from "vue-property-decorator";
//import { Core, EventObject } from "cytoscape";
//import Cytoscape from "@/components/Cytoscape";
//import CyElement from "@/components/CyElement";

import { config } from "@/common/graph";
//import { config } from "@/common/cy-config";
import { mapGetters } from "vuex";

//import coseBilkent from "cytoscape-cose-bilkent";
//import dagre from "cytoscape-dagre";
//import cola from "cytoscape-cola";
//import klay from "cytoscape-klay";
//import { isNode, isRelationship } from "neo4j-driver/lib/graph-types.js";

export default {
  data() {
    return {
      loading: false,
      config
    };
  },
  computed: {
    ...mapGetters("graph", { elements: "graphs" })
  },
  methods: {
    /*
    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance) {
        console.log("adding node", event.target);
      }
    },
    deleteNode(id) {
      console.log("node clicked", id);
    },
    updateNode(event) {
      console.log("right click node", event);
    },
    preConfig(cytoscape) {
      console.log("calling pre-config", cytoscape);
      //cytoscape.use(coseBilkent);
      //cytoscape.use(klay);
      //cytoscape.use(cola);
      //cytoscape.use(dagre);
      //if (!cytoscape("core", "cxtmenu")) {
      //   cytoscape.use(cxtmenu);
      //}
    },
    */
    afterCreated(cy) {
      // cy: this is the cytoscape instance

      console.log("after created", cy);

      cy.layout({
        name: "cose",
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      }).run();

      cy.center();
      //cy.fit(null, 200);
      cy.minZoom(1);
      cy.maxZoom(4);
    }
    /* ,
    config() {
      const defaultLayout = { ...config };
      return defaultLayout;
    }
    */
  },
  created() {
    this.loading = true;
    this.$store.dispatch("graph/findAll");
    //this.$store.dispatch("graph/findByName", this.name);
    this.loading = false;
  }
};
</script>
