import { geomapService } from "@/services";

const state = {
  geomaps: [],
  geomap: null,
  covid: []
};

const mutations = {
  SET_GEOMAPS(state, geomaps) {
    state.geomaps = geomaps;
  },
  SET_GEOMAP(state, geomap) {
    state.geomap = geomap;
  },
  SET_COVID(state, data) {
    state.covid = data;
  }
};

const actions = {
  findAll({ commit }) {
    return geomapService
      .findAll()
      .then(data => {
        commit("SET_COVID", data);
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
  },
  covid: state => {
    return state.covid;
  }
};

export const geomap = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

/*
import { geomapService } from "@/services";

const state = {
  geomaps: [],
  geomap: null,
  covid: []
};

const mutations = {
  SET_GEOMAPS(state, geomaps) {
    state.geomaps = geomaps;
  },
  SET_GEOMAP(state, geojson) {
    state.geomap = geojson;
  },
  APPEND_GEOMAPS(state, geojson) {
    state.geomaps.push(geojson);
  },
  SET_COVID(state, data) {
    state.covid = data;
  }
};
const actions = {
  findAll({ commit }) {
    return geomapService
      .findAll()
      .then(data => {
        commit("SET_COVID", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByName({ commit }, name) {
    return geomapService
      .findByName(name)
      .then(data => {
        commit("APPEND_GEOMAPS", data);
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
  },
  covid: state => {
    return state.covid;
  }
};

export const geomap = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
*/
