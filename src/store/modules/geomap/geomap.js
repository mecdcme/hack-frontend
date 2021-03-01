import { geomapService } from "@/services";

const state = {
  geomap: null,
  markerData: null
};

const mutations = {
  SET_GEOMAP(state, geomap) {
    state.geomap = geomap;
  },
  SET_MARKER(state, markerData) {
    state.markerData = markerData;
  }
};

const actions = {
  findAll({ commit }) {
    return geomapService
      .findAll()
      .then(data => {
        commit("SET_GEOMAP", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getMarker({ commit }, name) {
    return geomapService
      .findByName(name)
      .then(data => {
        commit("SET_MARKER", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  geomap: state => {
    return state.geomap;
  },
  markerData: state => {
    return state.markerData;
  }
};
export const geomap = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
