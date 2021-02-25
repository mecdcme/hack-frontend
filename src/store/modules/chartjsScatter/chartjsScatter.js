import { chartjsScatterService } from "@/services";

const state = {
  charts: [],
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
  findByName({ commit }, name) {
    return chartjsScatterService
      .findByName(name)
      .then(data => {
        commit("SET_SCATTER_CHARTS", data);
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
