import { chartVisjsService } from "@/services";

const state = {
  charts: [],
  chart: null
};
const mutations = {
  SET_CHARTS(state, charts) {
    state.charts = charts;
  },
  SET_CHART(state, chart) {
    state.chart = chart;
  }
};
const actions = {
  findAll({ commit }, n) {
    return chartVisjsService
      .findAll(n)
      .then(data => {
        commit("SET_CHARTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return chartVisjsService
      .findById(id)
      .then(data => {
        commit("SET_CHARTS", data.chart);
      })
      .catch(err => {
        console.log(err);
      });
  },
  clear({ commit }) {
    commit("SET_chartS", []);
  }
};
const getters = {
  charts: state => {
    return state.charts;
  },
  chart: state => {
    return state.chart;
  },
  nodes: state => {
    return state.charts ? state.charts.nodes : [];
  },
  edges: state => {
    return state.charts ? state.charts.edges : [];
  }
};
export const chartVisjs = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
