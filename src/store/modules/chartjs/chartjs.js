import { chartjsService } from "@/services";

const state = {
  charts: [],
  chart: null
};
const mutations = {
  SET_CHARTS(state, charts) {
    state.charts = charts;
  },
  SET_CHARTH(state, chart) {
    state.chart = chart;
  }
};
const actions = {
  findAll({ commit }, n) {
    return chartjsService
      .findAll(n)
      .then(data => {
        commit("SET_CHARTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return chartjsService
      .findById(id)
      .then(data => {
        commit("SET_CHARTS", data.chart);
      })
      .catch(err => {
        console.log(err);
      });
  },
  clear({ commit }) {
    commit("SET_CHARTS", []);
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
export const chartjs = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
