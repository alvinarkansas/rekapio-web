<template>
  <BaseModal v-model="recordAdd">
    <ModalRecordAdd
      @close="closeRecordAdd"
      @closeAndRefetch="closeAndRefetch"
    />
  </BaseModal>

  <div
    className="h-screen text-warning-200 font-semibold grid place-items-center"
  >
    Coming soon 🚀
  </div>
</template>

<script>
import BaseModal from "../components/BaseModal.vue";
import ModalRecordAdd from "../components/ModalRecordAdd.vue";

export default {
  name: "Budget",
  components: {
    BaseModal,
    ModalRecordAdd,
  },
  computed: {
    recordAdd() {
      return this.$store.state.modal.recordAdd;
    },
    accounts() {
      return this.$store.state.accounts;
    },
  },
  methods: {
    closeRecordAdd() {
      this.$store.commit("SET_MODAL", { type: "recordAdd", payload: false });
    },
    async closeAndRefetch() {
      this.closeRecordAdd();
      this.$store.commit("SET_LOADING", { type: "accounts", payload: true });
      this.$store.commit("SET_LOADING", {
        type: "recentRecords",
        payload: true,
      });
      await this.$store.dispatch("loadAccounts");
      await this.$store.dispatch("loadRecentRecords");
    },
  },
};
</script>
