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
    modal: {
      recordAdd: false,
      recordEdit: false,
      accountAdd: false,
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
        const { data: records } = await API.get("/records", {
          params: { limit: 5 },
        });

        if (records.length) {
          for (let i = 0; i < records.length; i++) {
            if (records[i].type === "transfer") {
              const { data: destinationAccount } = await API.get(
                `/accounts/${records[i].DestinationAccountId}`
              );

              records[i].DestinationAccount = destinationAccount;
            }
          }
        }

        commit("SET_RECENT_RECORDS", records);
      } catch (error) {
        console.log(error.response);
      }
    },
    async loadAccountRecords({ state, commit }) {
      try {
        const { data: records } = await API.get(`/records/${state.accountId}`);

        if (records.length) {
          for (let i = 0; i < records.length; i++) {
            for (let j = 0; j < records[i].rows.length; j++) {
              if (records[i].rows[j].type === "transfer") {
                const { data: destinationAccount } = await API.get(
                  `/accounts/${records[i].rows[j].DestinationAccountId}`
                );

                records[i].rows[j].DestinationAccount = destinationAccount;
              }
            }
          }
        }

        commit("SET_ACCOUNT_RECORDS", records);
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
    async loadAccount({ commit }, id) {
      try {
        const { data } = await API.get(`/accounts/${id}`);
        commit("SET_ACCOUNT", data);
      } catch (error) {
        console.log(error);
      }
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
