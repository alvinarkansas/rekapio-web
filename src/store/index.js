import { createStore } from "vuex";
import { AUTH_API, API } from "../api";
import dayjs from "dayjs";

export default createStore({
  state: {
    token: "",
    authenticated: false,
    accounts: [],
    recentRecords: [],
    accountRecords: [],
    categories: [],
    accountId: null,
    account: null,
    record: null,
    category: null,
    modal: {
      recordAdd: false,
      recordEdit: false,
      accountAdd: false,
      accountDetail: false,
      accountEdit: false,
      category: false,
      categoryEdit: false,
      icon: false,
    },
    categoryEditForm: {
      id: 0,
      name: "",
      icon: "",
      color: "",
    },
    loading: {
      account: false,
      accountRecords: false,
      accounts: false,
      recentRecords: false,
      categories: false,
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
    SET_ACCOUNT_RECORDS(state, payload) {
      state.accountRecords = payload;
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
    SET_ACCOUNT(state, payload) {
      state.account = payload;
    },
    SET_RECORD(state, payload) {
      state.record = payload;
    },
    SET_CATEGORY(state, payload) {
      state.category = payload;
    },
    SET_MODAL(state, { type, payload }) {
      state.modal[type] = payload;
    },
    SET_LOADING(state, { type, payload }) {
      state.loading[type] = payload;
    },
    SET_CATEGORY_EDIT_FORM(state, payload) {
      state.categoryEditForm = payload;
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
        commit("SET_LOADING", { type: "accounts", payload: true });
        const { data } = await API.get("/accounts");
        commit("SET_ACCOUNTS", data);
      } catch (error) {
        console.log(error.response);
      }
      commit("SET_LOADING", { type: "accounts", payload: false });
    },
    async loadRecentRecords({ commit }) {
      try {
        commit("SET_LOADING", { type: "recentRecords", payload: true });
        const { data: records } = await API.get("/records", {
          params: { limit: 5 },
        });

        commit("SET_RECENT_RECORDS", records);
      } catch (error) {
        console.log(error.response);
      }
      commit("SET_LOADING", { type: "recentRecords", payload: false });
    },
    async loadAccountRecords({ state, commit }) {
      try {
        commit("SET_LOADING", { type: "accountRecords", payload: true });
        const { data: records } = await API.get(`/records/${state.accountId}`);

        commit("SET_ACCOUNT_RECORDS", records);
      } catch (error) {
        console.log(error.response);
      }
      commit("SET_LOADING", { type: "accountRecords", payload: false });
    },
    async loadCategories({ commit }) {
      try {
        commit("SET_LOADING", { type: "categories", payload: true });
        const { data } = await API.get("/categories");
        commit("SET_CATEGORIES", data);
      } catch (error) {
        console.log(error.response);
      }
      commit("SET_LOADING", { type: "categories", payload: false });
    },
    async loadAccount({ commit }, id) {
      try {
        commit("SET_LOADING", { type: "account", payload: true });
        const { data } = await API.get(`/accounts/${id}`);
        commit("SET_ACCOUNT", data);
      } catch (error) {
        console.log(error);
      }
      commit("SET_LOADING", { type: "account", payload: false });
    },
    setRecordDetail({ commit }, payload) {
      const mapped = {
        id: payload.id,
        type: payload.type,
        amount: Math.abs(payload.amount),
        account: { name: payload.Account?.name, id: payload.Account?.id },
        category: {
          id: payload.Category?.id,
          name: payload.Category?.name,
          color: payload.Category?.color,
          icon: payload.Category?.icon,
        },
        destinationAccount: {
          name: payload.DestinationAccount?.name,
          id: payload.DestinationAccount?.id,
        },
        time: dayjs(payload.time).format("DD-MM-YYYY HH:mm"),
        note: payload.note,
      };
      commit("SET_RECORD", mapped);
    },
    getCategory({ state }, id) {
      return state.categories.filter((ctg) => ctg.id === id)[0];
    },
  },
  modules: {},
});
