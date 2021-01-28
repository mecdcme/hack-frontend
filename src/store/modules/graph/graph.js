import { graphService } from "@/services";

const state = {
  graphs: null,
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
