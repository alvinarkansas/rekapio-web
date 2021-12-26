<template>
  <BaseModal v-model="recordAdd">
    <ModalRecordAdd
      @close="closeRecordAdd"
      @closeAndRefetch="closeAndRefetch"
    />
  </BaseModal>

  <BaseModal v-model="accountDetail" fixed-inner>
    <ModalAccountDetail @close="closeAccountDetail" />
  </BaseModal>

  <BaseModal v-model="accountAdd">
    <ModalAccountAdd
      @close="closeAccountAdd"
      @closeAndRefetch="closeAccountAddAndRefetch"
    />
  </BaseModal>

  <BaseModal v-model="accountEdit">
    <ModalAccountEdit
      @close="closeAccountEdit"
      @closeAndRefetch="closeAccountDetailAndRefetch"
      @deleted="onAccountDelete"
    />
  </BaseModal>

  <section class="px-4 mb-8">
    <h2 class="mb-4 font-bold text-lg">Your Accounts</h2>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="rounded-lg bg-dark-100 p-3 pb-2"
        @click="openAccountDetail(account.id)"
      >
        <div class="flex gap-2 items-center">
          <div
            class="w-5 h-3 rounded-md flex-shrink-0"
            :style="{ background: account?.color }"
          />
          <h6 class="text-xs font-medium uppercase text-neutral-300 truncate">
            {{ account.name }}
          </h6>
        </div>
        <p class="text-lg font-semibold">
          {{ toRupiah(account.current_balance) }}
        </p>
      </div>

      <BaseButton
        icon="plus-small"
        @click="openAccountAdd"
        class="h-16"
        label="Add Account"
      />
    </div>
  </section>

  <section class="px-4">
    <div class="w-full p-4 bg-dark-100 rounded-lg">
      <h2 class="mb-4 font-bold text-lg">Recent Records</h2>
      <template v-if="recentRecords.length">
        <RecordCard
          v-for="record in recentRecords"
          :key="record.id"
          :icon-name="record.Category?.icon"
          :icon-color="record.Category?.color"
          :category="record.Category?.name"
          :amount="record?.amount"
          :time="record?.time"
          :note="record?.note"
          classes="mb-4"
        />
      </template>
    </div>
  </section>
</template>

<script>
import mixin from "../mixin";
import BaseButton from "../components/BaseButton.vue";
import BaseIcon from "../components/BaseIcon.vue";
import BaseModal from "../components/BaseModal.vue";
import ModalAccountAdd from "../components/ModalAccountAdd.vue";
import ModalAccountDetail from "../components/ModalAccountDetail.vue";
import ModalAccountEdit from "../components/ModalAccountEdit.vue";
import ModalRecordAdd from "../components/ModalRecordAdd.vue";
import RecordCard from "../components/RecordCard.vue";

export default {
  name: "Home",
  mixins: [mixin],
  components: {
    BaseButton,
    BaseIcon,
    BaseModal,
    ModalAccountAdd,
    ModalAccountDetail,
    ModalAccountEdit,
    ModalRecordAdd,
    RecordCard,
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
    accountId() {
      return this.$store.state.accountId;
    },
    recentRecords() {
      return this.$store.state.recentRecords;
    },
    recordAdd() {
      return this.$store.state.modal.recordAdd;
    },
    accountAdd() {
      return this.$store.state.modal.accountAdd;
    },
    accountDetail() {
      return this.$store.state.modal.accountDetail;
    },
    accountEdit() {
      return this.$store.state.modal.accountEdit;
    },
  },
  methods: {
    openAccountDetail(id) {
      this.$store.commit("SET_ACCOUNT_ID", id);
      this.$store.commit("SET_MODAL", { type: "accountDetail", payload: true });
    },
    openAccountAdd() {
      this.$store.commit("SET_MODAL", { type: "accountAdd", payload: true });
    },
    closeAccountAdd() {
      this.$store.commit("SET_MODAL", { type: "accountAdd", payload: false });
    },
    closeRecordAdd() {
      this.$store.commit("SET_MODAL", { type: "recordAdd", payload: false });
    },
    closeAccountDetail() {
      console.log("close: Detail");
      this.$store.commit("SET_MODAL", {
        type: "accountDetail",
        payload: false,
      });
    },
    closeAccountEdit() {
      console.log("close: Edit");
      this.$store.commit("SET_MODAL", { type: "accountEdit", payload: false });
    },
    async closeAndRefetch() {
      this.closeRecordAdd();
      await this.$store.dispatch("loadAccounts");
      await this.$store.dispatch("loadRecentRecords");
    },
    async closeAccountAddAndRefetch() {
      this.closeAccountAdd();
      await this.$store.dispatch("loadAccounts");
    },
    async closeAccountDetailAndRefetch() {
      this.closeAccountEdit();
      await this.$store.dispatch("loadAccounts");
      await this.$store.dispatch("loadAccount", this.accountId);
      await this.$store.dispatch("loadRecentRecords");
    },
    async onAccountDelete() {
      this.closeAccountEdit();
      this.closeAccountDetail();
      await this.$store.dispatch("loadAccounts");
    },
  },
  async mounted() {
    await this.$store.dispatch("loadAccounts");
    await this.$store.dispatch("loadRecentRecords");
  },
};
</script>
