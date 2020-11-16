import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { businessProcess } from "./modules/metadata/businessProcess";
import { geomap } from "./modules/geomap/geomap";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    businessProcess,
    geomap
  }
});
