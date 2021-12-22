<template>
  <BaseModal v-model="recordAdd">
    <ModalRecordAdd
      @close="closeRecordAddModal"
      @closeAndRefetch="closeAndRefetch"
    />
  </BaseModal>

  <section class="px-4 mb-8">
    <h2 class="mb-4 font-bold text-lg">Your Accounts</h2>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="rounded-lg bg-dark-100 p-3 pb-2"
      >
        <div class="flex gap-2 items-center">
          <div
            class="w-5 h-3 rounded-md"
            :style="{ background: account?.color }"
          />
          <h6 class="text-xs font-medium uppercase text-neutral-300">
            {{ account.name }}
          </h6>
        </div>
        <p class="text-lg font-semibold">
          {{ toRupiah(account.current_balance) }}
        </p>
      </div>
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
import BaseIcon from "../components/BaseIcon.vue";
import BaseModal from "../components/BaseModal.vue";
import ModalRecordAdd from "../components/ModalRecordAdd.vue";
import RecordCard from "../components/RecordCard.vue";

export default {
  name: "Home",
  mixins: [mixin],
  components: {
    BaseIcon,
    BaseModal,
    ModalRecordAdd,
    RecordCard,
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
    recentRecords() {
      return this.$store.state.recentRecords;
    },
    recordAdd() {
      return this.$store.state.modal.recordAdd;
    },
  },
  methods: {
    async closeRecordAddModal() {
      await this.$store.commit("SET_MODAL", {
        type: "recordAdd",
        payload: false,
      });
    },
    async closeAndRefetch() {
      this.closeRecordAddModal();
      await this.$store.dispatch("loadAccounts");
      await this.$store.dispatch("loadRecentRecords");
    },
  },
  async mounted() {
    await this.$store.dispatch("loadAccounts");
    await this.$store.dispatch("loadRecentRecords");
  },
};
</script>
