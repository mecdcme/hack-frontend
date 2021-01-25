<template>
  <div id="app">
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
          <CCardBody>
            <div id="app">
              <cytoscape
                ref="cyRef"
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
import { config } from "@/common/demograph";
import { mapGetters } from "vuex";

export default {
  name: "DemoGraph",
  data() {
    return {
      config
    };
  },
  computed: {
    ...mapGetters("demoGraph", { elements: "graphs" })
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
      console.log("after created", cy);
    }
  },
  created() {
    this.$store.dispatch("demoGraph/findAll");
  }
};
</script>
