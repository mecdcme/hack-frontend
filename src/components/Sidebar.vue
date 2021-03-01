<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="value => $store.commit('set', ['sidebarShow', 'responsive'])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon name="cil-terminal" size="lg"></CIcon>
      <span class="brand">2021 Hackathon</span>
    </CSidebarBrand>

    <ul class="c-sidebar-nav h-100 ps" style="position: relative;">
      <li class="c-sidebar-nav-item">
        <router-link tag="a" :to="{ name: 'Home' }" class="c-sidebar-nav-link">
          <CIcon name="cil-home" class="c-sidebar-nav-icon" />Home
          <span class="badge badge-primary">Alpha</span>
        </router-link>
      </li>
      <li class="c-sidebar-nav-title">Catalogue</li>
      <li class="c-sidebar-nav-item">
        <router-link tag="a" :to="{ name: 'Map' }" class="c-sidebar-nav-link">
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Map
        </router-link>
      </li>
      <!--li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'GraphCola' }"
          class="c-sidebar-nav-link"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Graph CoLa
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'GraphCose' }"
          class="c-sidebar-nav-link"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Graph CoSe
        </router-link>
      </li-->
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'GraphVisjs' }"
          class="c-sidebar-nav-link"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Graph VisJs
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'GraphSlider' }"
          class="c-sidebar-nav-link"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Graph slider
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'ChartjsBar' }"
          class="c-sidebar-nav-link"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Chartjs Bar
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'ChartjsScatter' }"
          class="c-sidebar-nav-link"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Chartjs Scatter
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'ChartjsLine' }"
          class="c-sidebar-nav-link"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Chartjs Line
        </router-link>
      </li>
    </ul>
  </CSidebar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", {
      show: "sidebarShow",
      minimize: "sidebarMinimize"
    })
  }
};
</script>
<style scoped>
.brand {
  font-size: 1.2em;
  padding-left: 1rem;
}
</style>
