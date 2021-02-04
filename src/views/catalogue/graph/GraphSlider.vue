<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Network - Graph
        </header>
        <CCardBody>
          <network
            class="network"
            ref="network"
            :nodes="network.nodes"
            :edges="network.edges"
            :options="network.options"
          />
          <div class="row mt-3">
            <div class="col-2">
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
            </div>
            <div class="col-10">
              <vue-slider :adsorb="true" v-model="sliderValue" />
            </div>
          </div>
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { Network } from "vue-visjs";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import { mapGetters } from "vuex";
import visMixin from "@/components/mixins/vis.mixin";

export default {
  name: "GraphVisjs",
  components: { Network, VueSlider },
  mixins: [visMixin],
  data: () => ({
    timer: null,
    counter: 0,
    ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    delta: 300,
    disablePlay: false
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
    },
    sliderValue() {
      return this.counter * 10;
    }
  },
  methods: {
    drawNetwork(id) {
      this.$store.dispatch("graphVisjs/findById", id);
    },
    play() {
      this.$store.dispatch("graphVisjs/clear");
      this.counter = 0;
      this.timer = setInterval(() => {
        if (this.counter < this.ids.length) {
          this.drawNetwork(this.ids[this.counter]);
          this.counter++;
        } else {
          this.stop();
        }
      }, this.delta);
      this.disablePlay = true;
    },
    stop() {
      clearInterval(this.timer);
      this.disablePlay = false;
    }
  },
  created() {
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
  height: 400px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
.vue-slider {
  margin-top: 5px;
  width: 95% !important;
  margin-left: -1rem;
}
</style>
