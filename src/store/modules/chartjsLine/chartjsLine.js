import { chartjsLineService } from "@/services";

const state = {
  charts: [],
  chart: null
};

const mutations = {
  SET_LINE_CHARTS(state, charts) {
    state.charts = charts;
  },
  SET_LINE_CHART(state, chart) {
    state.chart = chart;
  }
};
const actions = {
  findAll({ commit }) {
    return chartjsLineService
      .findAll()
      .then(data => {
        commit("SET_LINE_CHARTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByName({ commit }, name) {
    return chartjsLineService
      .findByName(name)
      .then(data => {
        commit("SET_LINE_CHARTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  charts: state => {
    return state.charts;
  },
  chart: state => {
    return state.chart;
  }
};
export const chartjsLine = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};