import { classificationService } from "@/services";

const state = {
  countries: [],
  products: [],
  transports: [],
  flows: [
    { id: 1, descr: "Import" },
    { id: 2, descr: "Export" }
  ],
  weights: [
    { id: 1, descr: true },
    { id: 2, descr: false }
  ]
};

const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_TRANSPORTS(state, transports) {
    state.transports = transports;
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
      .findAll("product3s")
      .then(data => {
        commit("SET_PRODUCTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getTransports({ commit }) {
    return classificationService
      .findAll("transports")
      .then(data => {
        commit("SET_TRANSPORTS", data);
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
  transports: state => {
    return state.transports;
  },
  flows: state => {
    return state.flows;
  },
  weights: state => {
    return state.weights;
  }
};
export const classification = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
