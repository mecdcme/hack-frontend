import { graphCoseService } from "@/services";

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
    return graphCoseService
      .findAll()
      .then(data => {
        commit("SET_GRAPHS", data);
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
export const graphCose = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
