import { graphService } from "@/services";

const state = {
  graphs: [],
  graph: null
};
const mutations = {
  SET_GRAPHS(state, graphs) {
    state.graphs = graphs;
  },
  SET_GRAPH(state, graph) {
    state.graph = graph;
  }
};
const actions = {
  findAll({ commit }) {
    return graphService
      .findAll()
      .then(data => {
        commit("SET_GRAPHS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByName({ commit }, name) {
    return graphService
      .findByName(name)
      .then(data => {
        commit("SET_GRAPH", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
const getters = {
  graphs: state => {
    return state.graphs;
  },
  graph: state => {
    return state.graph;
  }
};
export const graph = {
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
