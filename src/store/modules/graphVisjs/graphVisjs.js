import { graphVisjsService } from "@/services";

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
  findAll({ commit }, n) {
    return graphVisjsService
      .findAll(n)
      .then(data => {
        commit("SET_GRAPHS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return graphVisjsService
      .findById(id)
      .then(data => {
        commit("SET_GRAPHS", data.graph);
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
  },
  nodes: state => {
    return state.graphs ? state.graphs.nodes : [];
  },
  edges: state => {
    return state.graphs ? state.graphs.edges : [];
  }
};
export const graphVisjs = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
