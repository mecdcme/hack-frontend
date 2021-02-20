import { chartjsService } from "@/services";

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
  findAll({ commit }) {
    return chartjsService
      .findAll()
      .then(data => {
        commit("SET_CHARTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByName({ commit }, name) {
    return chartjsService
      .findByName(name)
      .then(data => {
        commit("SET_CHARTS", data);
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
export const chartjs = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
