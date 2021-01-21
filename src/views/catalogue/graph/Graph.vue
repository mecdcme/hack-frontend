<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="card">
          <header class="card-header">
            Graph
            <div class="card-header-actions">
              <!--span v-if="loading">Loading...</span-->
              <router-link tag="a" :to="{ name: 'Map' }">
                <add-icon />
              </router-link>
            </div>
          </header>
          <CCardBody>
            <div>
              <cytoscape
                ref="cy"
                :config="config"
                v-on:mousedown="addNode"
                v-on:cxttapstart="updateNode"
              >
                <cy-element
                  v-for="def in elements"
                  :key="`${def.data.id}`"
                  :definition="def"
                  v-on:mousedown="deleteNode($event, def.data.id)"
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
import { mapGetters } from "vuex";

//const elements = [...elements];
//delete elements;

export default {
  data() {
    return {
      config
    };
  },
  computed: {
    ...mapGetters("graph", { elements: "graphs" })
  },
  methods: {
    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    deleteNode(id) {
      console.log("node clicked", id);
    },
    updateNode(event) {
      console.log("right click node", event);
    },
    preConfig(cytoscape) {
      console.log("calling pre-config", cytoscape);
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("after created", cy);
    }
  },
  created() {
    //this.loading = true;
    this.$store.dispatch("graph/findAll");
    //this.$store.dispatch("graph/findByName", this.name);
    //this.loading = false;
  }
};
</script>
