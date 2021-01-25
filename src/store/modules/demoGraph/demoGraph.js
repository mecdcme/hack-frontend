import { demoGraphService } from "@/services";

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
    return demoGraphService
      .findAll()
      .then(data => {
        commit("SET_GRAPHS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByName({ commit }, name) {
    return demoGraphService
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
export const demoGraph = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
