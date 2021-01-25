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
                :preConfig="preConfig"
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
import { config } from "@/common/graph";
import { mapGetters } from "vuex";

import coseBilkent from "cytoscape-cose-bilkent";
import dagre from "cytoscape-dagre";
import cola from "cytoscape-cola";
import klay from "cytoscape-klay";

//import { isNode, isRelationship } from "neo4j-driver/lib/graph-types.js";

export default {
  name: "Graph",
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
    */

    preConfig(cytoscape) {
      console.log("calling pre-config", cytoscape);

      cytoscape.use(coseBilkent);
      cytoscape.use(klay);
      cytoscape.use(cola);
      cytoscape.use(dagre);

      //if (!cytoscape("core", "cxtmenu")) {
      //   cytoscape.use(cxtmenu);
      //}
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance

      console.log("after created", cy);

      let layout = {
        name: "cose",
        ready: function() {},
        stop: function() {},
        animate: true,
        animationEasing: undefined,
        animationDuration: undefined,
        animateFilter: function() {
          return true;
        },
        animationThreshold: 250,
        refresh: 20,
        fit: true,
        padding: 30,
        boundingBox: undefined,
        nodeDimensionsIncludeLabels: false,
        randomize: false,
        componentSpacing: 40,
        nodeRepulsion: function() {
          return 2048;
        },
        nodeOverlap: 4,
        idealEdgeLength: function() {
          return 32;
        },
        edgeElasticity: function() {
          return 32;
        },
        nestingFactor: 1.2,
        gravity: 1,
        numIter: 1000,
        initialTemp: 1000,
        coolingFactor: 0.99,
        minTemp: 1.0
      };

      let option = {
        animate: false, // whether to animate changes to the layout
        zoom: 4, // zoom level as a positive number to set after animation
        animationDuration: 500, // duration of animation in ms, if enabled
        animationEasing: undefined, // easing of animation, if enabled
        animateFilter: function() {
          return true;
        }, // a function that determines whether the node should be animated.
        // All nodes animated by default for `animate:true`.  Non-animated nodes are positioned immediately when the layout starts.
        //eles: , // collection of elements involved in the layout; set by cy.layout() or eles.layout()
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // padding to leave between graph and viewport
        pan: undefined, // pan the graph to the provided position, given as { x, y }
        ready: undefined, // callback for the layoutready event
        stop: undefined, // callback for the layoutstop event
        spacingFactor: 1, // a positive value which adjusts spacing between nodes (>1 means greater than usual spacing)
        transform: function(node, position) {
          return position;
        } // transform a given node position. Useful for changing flow direction in discrete layouts
      };

      cy.layout(layout, option, function() {
        cy.nodes.positions(function(n) {
          var pos = n.position();
          return { x: pos.y, y: pos.x };
        });
        cy.fit(); // fit to new node positions
      }).run();

      cy.center();
      cy.minZoom(1);
      cy.maxZoom(4);
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("graph/findAll");
    //this.$store.dispatch("graph/findByName", this.name);
    this.loading = false;
  }
};
</script>
