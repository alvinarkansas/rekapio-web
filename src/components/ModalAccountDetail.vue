<template>
  <section class="relative h-12">
    <BaseButton
      icon-only
      icon="cross"
      color="white"
      flavor="clear"
      class="absolute right-0 top-0"
      @click="$emit('close')"
    />
  </section>

  <header class="p-4 relative">
    <div
      :style="{ background: !loading.account ? account?.color : '#A6AFBC' }"
      class="absolute inset-0 h-1/2 rounded-t-xl"
      :class="{ 'animate-pulse': loading.account }"
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
        <template v-if="!loading.account">
          <p class="uppercase text-sm font-medium text-neutral-400">
            {{ account?.name }}
          </p>
          <button class="-mt-1" @click="openAccountEditModal">
            <BaseIcon name="pencil" :width="12" :height="12" />
          </button>
        </template>

        <template v-else>
          <div class="h-5 w-20 rounded-md bg-neutral-300 animate-pulse mb-2" />
        </template>
      </div>

      <p class="font-bold text-[26px]" v-if="!loading.account">
        {{ toRupiah(account?.current_balance) }}
      </p>
      <div
        v-else
        class="h-8 w-2/3 rounded-md bg-neutral-300 animate-pulse mb-1"
      />

      <p class="text-xs text-neutral-400" v-if="!loading.account">
        {{ `Last updated ${lastUpdated}` }}
      </p>
      <div v-else class="h-3 w-28 rounded bg-neutral-300 animate-pulse" />
    </div>
  </header>

  <template v-if="!loading.accountRecords">
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
      <BaseButton label="Back to home" @click="$emit('close')" uppercase />
    </section>
  </template>

  <template v-else>
    <div v-for="i in 2" :key="i" class="mb-8">
      <div class="flex justify-between items-center mb-5 px-4">
        <div class="h-4 w-32 bg-neutral-300 rounded-md animate-pulse" />
        <div class="h-4 w-20 bg-neutral-300 rounded-md animate-pulse" />
      </div>
      <div class="flex flex-col gap-4">
        <div v-for="j in 3" :key="j" class="flex justify-between mx-4">
          <div class="flex gap-2">
            <span class="h-9 w-9 rounded-full bg-neutral-300 animate-pulse" />
            <div>
              <div
                class="h-4 w-28 bg-neutral-300 rounded-md animate-pulse mb-2"
              />
              <div class="h-3 w-20 bg-neutral-300 rounded-md animate-pulse" />
            </div>
          </div>

          <div class="h-4 w-16 bg-neutral-300 rounded-md animate-pulse mb-2" />
        </div>
      </div>
    </div>
  </template>
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
    loading() {
      return this.$store.state.loading;
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
    this.$store.commit("SET_LOADING", { type: "account", payload: true });
    this.$store.commit("SET_LOADING", { type: "accountRecords", payload: true });
    await this.$store.dispatch("loadAccount", this.accountId);
    await this.$store.dispatch("loadAccountRecords");
  },
};
</script>
