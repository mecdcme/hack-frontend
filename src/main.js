import Vue from "vue";

import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "@/assets/icons/icons.js";
import Vuelidate from "vuelidate";
import vSelect from "vue-select";

//Leaflet (https://vue2-leaflet.netlify.app/)
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

//Leaflet - icon (bug fixing)
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

import "@/assets/icons/materialIcons";
Vue.config.productionTip = false;

Vue.use(CoreuiVue);
Vue.use(Vuelidate);

Vue.component("v-select", vSelect);

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount("#app");
