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
    return geomapService
      .findAll()
      .then(data => {
        commit("SET_GEOMAPS", data);
        commit("SET_GEOMAP", null); //clear geomap
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByName({ commit }, name) {
    return geomapService
      .findByName(name)
      .then(data => {
        commit("SET_GEOMAP", data);
      })
      .catch(err => {
        console.log(err);
      });
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
