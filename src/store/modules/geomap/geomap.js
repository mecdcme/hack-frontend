//import router from "@/router";
import { geomapService } from "@/services";

const state = {
  geomaps: [],
  geomap: null
};

const mutations = {
  SET_GEOMAPS(state, geomaps) {
    state.geomaps = geomaps;
  },
  SET_GEOMAP(state, geomap) {
    state.geomap = geomap;
  }
};

const actions = {
  findAll({ commit }) {
    geomapService.findAll().then(
      data => {
        commit("SET_GEOMAPS", data);
        commit("SET_GEOMAP", null); //clear geomap
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    geomapService.findById(id).then(
      data => {
        commit("SET_GEOMAP", data);
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  geomaps: state => {
    return state.geomaps;
  },
  geomap: state => {
    return state.geomap;
  }
};

export const geomap = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
