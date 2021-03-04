import { chartjsScatterService } from "@/services";
import { buildCharts } from "@/common";

const state = {
  charts: null,
  chart: null
};

const mutations = {
  SET_SCATTER_CHARTS(state, charts) {
    state.charts = charts;
  },
  SET_SCATTER_CHART(state, chart) {
    state.chart = chart;
  }
};
const actions = {
  findAll({ commit }) {
    return chartjsScatterService
      .findAll()
      .then(data => {
        commit("SET_SCATTER_CHARTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByFilters({ commit }, form) {
    return chartjsScatterService
      .findByFilters(form)
      .then(data => {
        var localData = buildCharts(data);
        commit("SET_SCATTER_CHARTS", localData);
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
export const chartjsScatter = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
