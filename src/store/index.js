import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { businessProcess } from "./modules/metadata/businessProcess";
import { geomap } from "./modules/geomap/geomap";
import { graphCola } from "./modules/graphCola/graphCola";
import { graphCose } from "./modules/graphCose/graphCose";
import { graphVisjs } from "./modules/graphVisjs/graphVisjs";
import { chartjs } from "./modules/chartjs/chartjs";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    businessProcess,
    geomap,
    graphCose,
    graphCola,
    graphVisjs,
    chartjs
  }
});
