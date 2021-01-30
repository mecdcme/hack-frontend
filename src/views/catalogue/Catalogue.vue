<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Map</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains maps displaying hack data.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'Map' }"
              ><span>Go to map section <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Process catalogue
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the Graph Cola .
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'GraphCola' }"
              ><span>Go to GraphCola catalogue <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Process catalogue
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the Graph CoSe .
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'GraphCose' }"
              ><span>Go to GraphCose catalogue <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Process catalogue
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the Graph VisJs .
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'GraphVisjs' }"
              ><span>Go to GraphVisjs catalogue <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Metadata"
};
</script>

<style scoped>
.material-design-icon > .material-design-icon__svg {
  bottom: -0.17rem;
}
</style>
