import { createStore } from "vuex";
import { AUTH_API, API } from "../api";

export default createStore({
  state: {
    token: "",
    authenticated: false,
    accounts: [],
    recentRecords: [],
    categories: [],
    accountId: null,
    modal: {
      recordAdd: false,
      accountDetail: false,
      accountEdit: false,
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_AUTHENTICATED(state, payload) {
      state.authenticated = payload;
    },
    SET_ACCOUNTS(state, payload) {
      state.accounts = payload;
    },
    SET_RECENT_RECORDS(state, payload) {
      state.recentRecords = payload;
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_ACCOUNT_ID(state, payload) {
      state.accountId = payload;
    },
    SET_MODAL(state, { type, payload }) {
      state.modal[type] = payload;
    },
  },
  actions: {
    async refreshToken({ commit }) {
      try {
        const { data } = await AUTH_API.post("/refresh_token");
        commit("SET_TOKEN", data.access_token);
        commit("SET_AUTHENTICATED", true);
      } catch (error) {
        console.log("❗", error.response);
      }
    },
    async loadAccounts({ commit }) {
      try {
        const { data } = await API.get("/accounts");
        commit("SET_ACCOUNTS", data);
      } catch (error) {
        console.log(error.response);
      }
    },
    async loadRecentRecords({ commit }) {
      try {
        const { data } = await API.get("/records", { params: { limit: 5 } });
        commit("SET_RECENT_RECORDS", data);
      } catch (error) {
        console.log(error.response);
      }
    },
    async loadCategories({ commit }) {
      try {
        const { data } = await API.get("/categories");
        commit("SET_CATEGORIES", data);
      } catch (error) {
        console.log(error.response);
      }
    },
    getCategory({ state }, id) {
      console.log(id);
      console.log(state.categories);
      console.log(state.categories.filter((ctg) => ctg.id === id)[0]);
      return state.categories.filter((ctg) => ctg.id === id)[0];
    },
  },
  modules: {},
});
