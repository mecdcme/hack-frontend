import router from "@/router";
import { businessProcessService } from "@/services";

const state = {
  businessProcesss: [],
  businessProcess: null
};

const mutations = {
  SET_BUSINESS_PROCESSES(state, businessProcesss) {
    state.businessProcesss = businessProcesss;
  },
  SET_BUSINESS_PROCESS(state, businessProcess) {
    state.businessProcess = businessProcess;
  }
};

const actions = {
  findAll({ commit }) {
    businessProcessService.findAll().then(
      data => {
        commit("SET_BUSINESS_PROCESSES", data);
        commit("SET_BUSINESS_PROCESS", null); //clear statistical process
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    businessProcessService.findById(id).then(
      data => {
        commit("SET_BUSINESS_PROCESS", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    businessProcessService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business process saved!", {
          root: true
        });
        router.push("/catalogue/process");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    businessProcessService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business process deleted!", {
          root: true
        });
        router.push("/catalogue/process");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    businessProcessService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business process updated!", {
          root: true
        });
        router.push("/catalogue/process");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  businessProcesss: state => {
    return state.businessProcesss;
  },
  businessProcess: state => {
    return state.businessProcess;
  }
};

export const businessProcess = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
