import { classificationService } from "@/services";

const state = {
  countries: [],
  products: [],
  transport: []
};

const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_TRANSPORT(state, transport) {
    state.transport = transport;
  }
};

const actions = {
  getCountries({ commit }) {
    return classificationService
      .findAll("countries")
      .then(data => {
        commit("SET_COUNTRIES", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getProducts({ commit }) {
    return classificationService
      .findAll("products")
      .then(data => {
        commit("SET_PRODUCTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getTransport({ commit }) {
    return classificationService
      .findAll("transport")
      .then(data => {
        commit("SET_TRANSPORT", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  countries: state => {
    return state.countries;
  },
  products: state => {
    return state.products;
  },
  transport: state => {
    return state.transport;
  }
};
export const classification = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
