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
          />
          <CButton
            shape="square"
            size="sm"
            color="primary"
            class="mr-2"
            @click="play"
            :disabled="disablePlay"
            >Play</CButton
          >
          <CButton shape="square" size="sm" color="danger" @click="stop"
            >Stop</CButton
          >
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
    timer: null,
    counter: 0,
    ids: [1, 2, 3],
    delta: 1500,
    disablePlay: false
  }),
  computed: {
    ...mapGetters("graphVisjs", ["nodes", "edges"]),
    network() {
      return {
        nodes: this.nodes ? this.nodes : [],
        edges: this.edges ? this.edges : [],
        options: this.options
      };
    }
  },
  methods: {
    drawNetwork(id) {
      this.$store.dispatch("graphVisjs/findById", id);
    },
    play() {
      this.timer = setInterval(() => {
        if (this.counter < this.ids.length) {
          this.drawNetwork(this.ids[this.counter]);
          this.counter++;
        }
      }, this.delta);
      this.disablePlay = true;
    },
    stop() {
      clearInterval(this.timer);
      this.counter = 0;
      this.disablePlay = false;
      this.$store.dispatch("graphVisjs/clear");
    }
  },
  created(){
    this.$store.dispatch("graphVisjs/clear");
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
  height: 520px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>
