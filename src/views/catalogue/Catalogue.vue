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
          This section contains the list of processes available in the
          catalogue. The processes allow to execute the algorithms offered by
          the statistical services.
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'BusinessProcessList' }"
              ><span>Go to process catalogue <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">Analytics</header>
        <div class="card-body">
          This section contains analytics capabilities to display aggregate
          data.
          <p class="section-link section-link-disabled">
            <span>Go to analytics section <chevron-right-icon /></span>
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
