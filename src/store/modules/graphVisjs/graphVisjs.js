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
  /*,
  INCREASE_X(state, graphs) {
    state.graphs.nodes.x = state.graphs.nodes.x * 100;
  },
  INCREASE_y(state, graphs) {
    state.graphs.nodes.y = state.graphs.nodes.y * 100;
  }
  */
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
  },
  clear({ commit }) {
    commit("SET_GRAPHS", []);
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
