import { Context } from "@/common";

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  context: "",
  isHome: false,
  isLoading: false,
  isMap: false,
  isGraph: false,
  isPolicy: false,
  isTrade: false,
  isMobility: false,
  breadcrumbs: [
    {
      path: "metadata",
      to: "/metadata"
    }
  ]
};

const mutations = {
  TOGGLE_SIDEBAR_DESKTOP(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  TOGGLE_SIDEBAR_MOBILE(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_CONTEXT(state, context) {
    state.context = context;
    switch (context) {
      case Context.Home:
        state.isHome = true;
        break;
      case Context.Map:
        state.isMap = true;
        break;
      case Context.Graph:
        state.isGraph = true;
        break;
      case Context.Policy:
        state.isPolicy = true;
        break;
      case Context.Trade:
        state.isTrade = true;
        break;
      case Context.Mobility:
        state.isMobility = true;
        break;
      default:
        break;
    }
  },
  CLEAR_CONTEXT(state) {
    state.context = "";
    state.isHome = false;
    state.isMap = false;
    state.isGraph = false;
    state.isPolicy = false;
    state.isTrade = false;
    state.isMobility = false;
  },
  CREATE_BREADCRUMBS(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  },
  set(state, [variable, value]) {
    state[variable] = value;
  }
};

const actions = {
  toggleSidebarDesktop({ commit }) {
    commit("TOGGLE_SIDEBAR_DESKTOP");
  },
  toggleSidebarMobile({ commit }) {
    commit("TOGGLE_SIDEBAR_MOBILE");
  },
  loading({ commit }, isLoading) {
    commit("SET_LOADING", isLoading);
  },
  setContext({ commit }, context) {
    commit("CLEAR_CONTEXT");
    commit("SET_CONTEXT", context);
  },
  clearContext({ commit }) {
    commit("CLEAR_CONTEXT");
  },
  createBreadcrumbs({ commit }, route) {
    let pathArray = route.path.split("/");
    pathArray.shift();
    //console.log(route.params);
    if (Object.keys(route.params).length > 0) {
      //if route has a parameter remove it from array
      pathArray.pop();
    }
    let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
      var to = "/";
      if (idx > 0) {
        for (var i = 0; i < idx; i++) {
          to += breadcrumbArray[i].path + "/";
        }
      }
      to += path;
      //console.log(to);
      breadcrumbArray.push({
        path: path,
        to: to
      });
      return breadcrumbArray;
    }, []);
    commit("CREATE_BREADCRUMBS", breadcrumbs);
  }
};

const getters = {
  sidebarShow: state => {
    return state.sidebarShow;
  },
  sidebarMinimize: state => {
    return state.sidebarMinimize;
  },
  context: state => {
    return state.context;
  },
  isLoading: state => {
    return state.isLoading;
  },
  isHome: state => {
    return state.isHome;
  },
  isMap: state => {
    return state.isMap;
  },
  isGraph: state => {
    return state.isGraph;
  },
  isPolicy: state => {
    return state.isPolicy;
  },
  isTrade: state => {
    return state.isTrade;
  },
  isMobility: state => {
    return state.isMobility;
  },
  breadcrumbs: state => {
    return state.breadcrumbs;
  }
};

export const coreui = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
