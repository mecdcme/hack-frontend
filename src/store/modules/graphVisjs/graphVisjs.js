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
  },
  INCREASE_XY(state, graphs) {
    graphs.nodes.forEach(node => {
      node.x = node.x * 314;
      node.y = node.y * 314;
    });
    state.graphs = graphs;
  },
  PUSH_FLAG(state, graphs) {
    graphs.nodes.forEach(node => {
      graphs.nodes.push({
        shape: "image",
        image:
          "https://flagpedia.net/data/flags/mini/" +
          node.label.toLowerCase() +
          ".png"
      });
    });
    state.graphs = graphs;
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
        commit("INCREASE_XY", data.graph);
        //commit("PUSH_FLAG", data.graph);
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
