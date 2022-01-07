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

  <BaseModal v-model="recordEdit">
    <ModalRecordEdit @close="closeRecordEdit" />
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
      <template v-if="!loading.accounts">
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
      </template>

      <template v-else>
        <div
          v-for="i in 3"
          :key="i"
          class="rounded-lg h-16 bg-neutral-300 animate-pulse"
        />
      </template>

      <BaseButton
        v-if="!loading.accounts"
        icon="plus-small"
        @click="openAccountAdd"
        class="h-16"
        label="Add Account"
        uppercase
      />
    </div>
  </section>

  <section class="px-4">
    <div class="w-full py-4 bg-dark-100 rounded-lg">
      <h2 class="mb-4 px-4 font-bold text-lg">Recent Records</h2>
      <template v-if="!loading.recentRecords">
        <template v-if="recentRecords.length">
          <RecordCard
            v-for="(record, index) in recentRecords"
            :key="record.id"
            :icon-name="record.Category?.icon"
            :icon-color="record.Category?.color"
            :category="record.Category?.name"
            :des-account-name="record.DestinationAccount?.name"
            :des-account-color="record.DestinationAccount?.color"
            :account-name="record.Account?.name"
            :account-color="record.Account?.color"
            :amount="record?.amount"
            :time="calendar(record?.time)"
            :note="record?.note"
            @click="openRecordEdit(record)"
            :classes="['px-4', { 'mb-4': index !== recentRecords.length - 1 }]"
          />
        </template>
        <div
          v-else
          class="h-80 px-4 flex flex-col gap-3 items-center justify-center"
        >
          <p class="text-sm">You have no recent records</p>
          <BaseButton
            label="Add new record"
            uppercase
            @click="
              $store.commit('SET_MODAL', { type: 'recordAdd', payload: true })
            "
          />
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col gap-4">
          <div v-for="i in 5" :key="i" class="flex justify-between mx-4">
            <div class="flex gap-2">
              <span class="h-9 w-9 rounded-full bg-neutral-300 animate-pulse" />
              <div>
                <div
                  class="h-4 w-28 bg-neutral-300 rounded-md animate-pulse mb-2"
                />
                <div class="h-3 w-20 bg-neutral-300 rounded-md animate-pulse" />
              </div>
            </div>

            <div
              class="h-4 w-16 bg-neutral-300 rounded-md animate-pulse mb-2"
            />
          </div>
        </div>
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
import ModalRecordEdit from "../components/ModalRecordEdit.vue";
import RecordCard from "../components/RecordCard.vue";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

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
    ModalRecordEdit,
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
    recordEdit() {
      return this.$store.state.modal.recordEdit;
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
    loading() {
      return this.$store.state.loading;
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
    openRecordEdit(record) {
      this.$store.dispatch("setRecordDetail", record);
      this.$store.commit("SET_MODAL", { type: "recordEdit", payload: true });
    },
    closeAccountAdd() {
      this.$store.commit("SET_MODAL", { type: "accountAdd", payload: false });
    },
    closeRecordAdd() {
      this.$store.commit("SET_MODAL", { type: "recordAdd", payload: false });
    },
    closeRecordEdit() {
      this.$store.commit("SET_MODAL", { type: "recordEdit", payload: false });
    },
    closeAccountDetail() {
      this.$store.commit("SET_MODAL", {
        type: "accountDetail",
        payload: false,
      });
    },
    closeAccountEdit() {
      this.$store.commit("SET_MODAL", { type: "accountEdit", payload: false });
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
    async closeAccountAddAndRefetch() {
      this.closeAccountAdd();
      this.$store.commit("SET_LOADING", { type: "accounts", payload: true });
      await this.$store.dispatch("loadAccounts");
    },
    async closeAccountDetailAndRefetch() {
      this.$store.commit("SET_LOADING", { type: "account", payload: true });
      this.$store.commit("SET_LOADING", {
        type: "accountRecords",
        payload: true,
      });
      this.$store.commit("SET_LOADING", { type: "accounts", payload: true });
      this.$store.commit("SET_LOADING", {
        type: "recentRecords",
        payload: true,
      });

      this.closeAccountEdit();

      await this.$store.dispatch("loadAccounts");
      await this.$store.dispatch("loadAccountRecords");
      await this.$store.dispatch("loadAccount", this.accountId);
      await this.$store.dispatch("loadRecentRecords");
    },
    async onAccountDelete() {
      this.closeAccountEdit();
      this.closeAccountDetail();
      this.$store.commit("SET_LOADING", { type: "accounts", payload: true });
      await this.$store.dispatch("loadAccounts");
    },
    calendar(time) {
      return dayjs(time).calendar(null, {
        sameDay: "[Today at] HH:mm",
        lastDay: "[Yesterday at] HH:mm",
        lastWeek: "[Last] ddd [at] HH:mm",
        sameElse: "D MMM YYYY [at] HH:mm",
      });
    },
  },
  async mounted() {
    if (!this.$store.state.accounts.length) {
      this.$store.commit("SET_LOADING", { type: "accounts", payload: true });
      this.$store.commit("SET_LOADING", {
        type: "recentRecords",
        payload: true,
      });
      await this.$store.dispatch("loadAccounts");
      await this.$store.dispatch("loadRecentRecords");
    }
  },
};
</script>
