<template>
  <section class="relative h-12">
    <BaseButton
      icon-only
      icon="cross"
      color="white"
      bg-color="transparent"
      class="absolute right-0 top-0"
      @click="$emit('close')"
    />
  </section>

  <header class="p-4 relative">
    <div
      :style="{ background: account?.color }"
      class="absolute inset-0 h-1/2 rounded-t-xl"
    />
    <div
      class="
        relative
        flex flex-col
        gap-1
        rounded-lg
        bg-white
        text-neutral-500
        p-4
        shadow-md
      "
    >
      <div class="flex gap-2 items-center">
        <p class="uppercase text-sm font-medium text-neutral-400">
          {{ account?.name }}
        </p>
        <button class="-mt-1" @click="openAccountEditModal">
          <BaseIcon name="pencil" :width="12" :height="12" />
        </button>
      </div>
      <p class="font-bold text-[26px]">
        {{ toRupiah(account?.current_balance) }}
      </p>
      <p class="text-xs text-neutral-400">
        {{ `Last updated ${lastUpdated}` }}
      </p>
    </div>
  </header>

  <section
    v-if="accountRecords.length"
    class="overflow-y-auto pb-4"
    :style="{ 'max-height': 'calc(100% - 147px - 3rem)' }"
  >
    <div v-for="record in accountRecords" :key="record.id" class="mb-8">
      <div class="flex justify-between items-center mb-5 px-4">
        <p class="font-semibold">
          {{ formatRecordTime(record.time) }}
        </p>
        <p class="rounded-full text-xs font-semibold bg-dark-100 py-1 px-3">
          {{ toRupiah(record.total) }}
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <RecordCard
          v-for="row in record.rows"
          :key="row.id"
          :icon-name="getCategory(row.CategoryId)?.icon"
          :icon-color="getCategory(row.CategoryId)?.color"
          :category="getCategory(row.CategoryId)?.name"
          :account-color="row.Account?.color"
          :account-name="row.Account?.name"
          :des-account-id="row.DestinationAccount?.id"
          :des-account-name="row.DestinationAccount?.name"
          :des-account-color="row.DestinationAccount?.color"
          :amount="row.amount"
          :time="row.time"
          :note="row.note"
          @click="openRecordEdit(row)"
          classes="px-4"
        />
      </div>
    </div>
  </section>

  <section
    v-else
    class="px-4 pb-4 flex flex-col items-center justify-center gap-4"
    :style="{ height: 'calc(100% - 147px - 3rem)' }"
  >
    <p class="text-center text-xl font-bold">
      There are no records for this account
    </p>
    <BaseButton label="Return" @click="$emit('close')" />
  </section>
</template>

<script>
import mixin from "../mixin";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import RecordCard from "./RecordCard.vue";

dayjs.extend(relativeTime);

export default {
  components: { BaseButton, BaseIcon, RecordCard },
  name: "ModalAccountDetail",
  mixins: [mixin],
  emits: ["close"],
  data() {
    return {
      detail: {
        name: "",
        color: "",
        updatedAt: "",
        currentBalance: 0,
      },
      records: [],
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    accountId() {
      return this.$store.state.accountId;
    },
    accountRecords() {
      return this.$store.state.accountRecords;
    },
    lastUpdated() {
      return dayjs(this.account?.updatedAt).fromNow();
    },
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    openAccountEditModal() {
      this.$store.commit("SET_MODAL", { type: "accountEdit", payload: true });
    },
    openRecordEdit(record) {
      this.$store.dispatch("setRecordDetail", record);
      this.$store.commit("SET_MODAL", { type: "recordEdit", payload: true });
    },
    formatRecordTime(time) {
      return dayjs(time).format("ddd, D MMM");
    },
    getCategory(id) {
      return this.categories.filter((ctg) => ctg.id === id)[0];
    },
  },
  async mounted() {
    await this.$store.dispatch("loadAccount", this.accountId);
    await this.$store.dispatch("loadAccountRecords");
    await this.$store.dispatch("loadCategories");
    console.log(this.accountRecords);
  },
};
</script>
