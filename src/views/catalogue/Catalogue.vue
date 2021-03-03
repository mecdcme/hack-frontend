<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span class="card-title"
            >Economic and International Trade Indicators</span
          >
        </header>
        <div class="card-body">
          <p>
            This section provides a map displaying for each country the total
            population and some some macro-economic indicators and trade
            information: main partner and exchanged goods for import and export
            in 2019 and 2020.
          </p>
          <p class="mt-2">
            Further the component provides a
            <strong>time-lapse</strong> functionality to represent the
            international trade monthly variations for the last twelve months.
          </p>
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'Map' }"
              ><span
                >Go to trade indicators section <chevron-right-icon
              /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Graph
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the graph .
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'GraphVisjs' }"
              ><span>Go to graph section <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Policy
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the policy indicator.
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'ChartjsScatter' }"
              ><span>Go to policy indicator <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span class="card-title">YOY changes in products (CPA) shares</span>
        </header>
        <div class="card-body">
          This section contains trade data.
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'ChartjsLine' }"
              ><span>Go to trade section <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4"></div>
  </div>
</template>

<script>
import { Context } from "@/common";
export default {
  name: "Metadata",
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  }
};
</script>

<style scoped>
.material-design-icon > .material-design-icon__svg {
  bottom: -0.17rem;
}
.card-title {
  font-weight: 600;
}
</style>
