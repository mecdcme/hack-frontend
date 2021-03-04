import { mobilityService } from "@/services";

const state = {
  mobilities: [],
  mobility: null
};
/*
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
    return mobilityService
      .findAll()
      .then(data => {
        commit("SET_SCATTER_CHARTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
*/
const mutations = {
  SET_MOBILITIES(state, mobilities) {
    state.mobilities = mobilities;
  },
  SET_MOBIITY(state, mobility) {
    state.mobility = mobility;
  }
};
const actions = {
  findAll({ commit }) {
    return mobilityService
      .findAll()
      .then(data => {
        commit("SET_MOBILITIES", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  findByName({ commit }, filter) {
    return mobilityService
      .findByName(filter)
      .then(data => {
        commit("SET_MOBILITIES", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  mobilities: state => {
    return state.mobilities;
  },
  mobility: state => {
    return state.mobility;
  }
};
export const mobility = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
