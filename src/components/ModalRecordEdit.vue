<template>
  <BaseModal v-model="confirmation" permanent>
    <div class="bg-dark-300 text-neutral-100 rounded-t-3xl">
      <header class="bg-dark-100 p-4 relative rounded-t-3xl">
        <h1 class="font-bold text-center">Delete Confirmation</h1>
      </header>

      <section class="pt-4 pb-6">
        <p class="text-center mb-4">
          Are you sure you want to delete this record?
        </p>
        <div class="flex gap-4 px-4">
          <BaseButton
            label="Cancel"
            class="w-full"
            size="md"
            @click="confirmation = false"
          />
          <BaseButton
            flavor="danger"
            label="Delete"
            loading-label="Deleting"
            class="w-full"
            size="md"
            :loading="loading.delete"
            @click="deleteRecord"
          />
        </div>
      </section>
    </div>
  </BaseModal>

  <div class="bg-dark-300 text-neutral-100 rounded-t-3xl">
    <header class="bg-dark-100 p-4 relative rounded-t-3xl">
      <button @click="$emit('close')" class="text-error-200 absolute">
        Cancel
      </button>
      <h1 class="font-bold text-center">Edit Record</h1>
    </header>

    <form
      class="overflow-y-auto py-4 flex flex-col gap-4"
      style="max-height: calc(85vh - 56px)"
      @submit.prevent="handleSubmit"
    >
      <div class="flex px-4 w-full">
        <div class="flex gap-1 w-full bg-dark-100 p-1 rounded-xl">
          <div
            class="
              flex
              justify-center
              items-center
              flex-grow
              rounded-lg
              px-2
              py-1
            "
            :class="form.type === 'expense' ? 'bg-shades-400' : 'sm:cursor-pointer'"
          >
            <input
              v-model="form.type"
              type="radio"
              class="hidden"
              value="expense"
              id="typeExpense"
            />
            <label class="font-medium" for="typeExpense"> Expense </label>
          </div>

          <div
            class="
              flex
              justify-center
              items-center
              flex-grow
              rounded-lg
              px-2
              py-1
            "
            :class="form.type === 'income' ? 'bg-shades-400' : 'sm:cursor-pointer'"
          >
            <input
              v-model="form.type"
              type="radio"
              class="hidden"
              value="income"
              id="typeIncome"
            />
            <label class="font-medium" for="typeIncome"> Income </label>
          </div>

          <div
            class="
              flex
              justify-center
              items-center
              flex-grow
              rounded-lg
              px-2
              py-1
            "
            :class="form.type === 'transfer' ? 'bg-shades-400' : 'sm:cursor-pointer'"
          >
            <input
              v-model="form.type"
              type="radio"
              class="hidden"
              value="transfer"
              id="typeTransfer"
            />
            <label class="font-medium" for="typeTransfer"> Transfer </label>
          </div>
        </div>
      </div>

      <div class="bg-dark-100 flex justify-between px-4 py-3">
        <div class="bg-dark-100">
          <CurrencyInput
            v-model="form.amount"
            :prefix="form.type === 'expense' ? '-Rp ' : 'Rp '"
            :classes="[
              'py-2 text-4xl font-semibold',
              { 'text-error-200': form.type === 'expense' },
              { 'text-green-500': form.type === 'income' },
            ]"
          />
        </div>
      </div>

      <div class="text-sm">
        <div class="mb-[1px]">
          <div class="flex justify-between px-4 py-2 relative z-10 bg-dark-100">
            <div class="flex gap-2 items-center justify-center">
              <div class="p-3">
                <BaseIcon name="credit-card" />
              </div>
              <span>Account</span>
            </div>
            <div
              class="flex gap-2 items-center justify-center sm:cursor-pointer"
              @click="toggleAccordion('account')"
            >
              <span class="uppercase">{{ form.account.name }}</span>
              <ChevronUpIcon v-if="expand.account" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5 text-neutral-300" />
            </div>
          </div>

          <transition name="slide-down">
            <div
              v-if="expand.account"
              class="
                flex
                gap-4
                overflow-x-auto
                pt-2
                pb-4
                relative
                z-0
                bg-dark-100
                no-scrollbar
              "
            >
              <span
                v-for="(account, index) in accounts"
                :key="account.id"
                class="py-2 px-4 rounded-lg flex-shrink-0 font-medium uppercase sm:cursor-pointer"
                :class="[
                  index === 0
                    ? 'ml-4'
                    : index === accounts.length - 1
                    ? 'mr-4'
                    : '',
                  form.account.id === account.id
                    ? 'bg-shades-400'
                    : 'bg-white/10',
                ]"
                @click="form.account = { name: account.name, id: account.id }"
              >
                {{ account.name }}
              </span>
            </div>
          </transition>
        </div>

        <div class="mb-[1px]" v-if="form.type !== 'transfer'">
          <div
            class="
              flex
              justify-between
              items-center
              px-4
              py-2
              relative
              z-10
              bg-dark-100
            "
            style="min-height: 60px"
          >
            <div class="flex gap-2 items-center justify-center">
              <div
                class="h-10 w-10 grid place-items-center rounded-full"
                :style="{ background: form.category.color || '' }"
              >
                <BaseIcon :name="form.category.icon || 'folder'" />
              </div>
              <span>Category</span>
            </div>
            <div
              class="flex gap-2 items-center justify-center sm:cursor-pointer"
              @click="toggleAccordion('category')"
            >
              <span v-if="!form.category.name" class="text-error-200">
                Required
              </span>
              <span v-else>{{ form.category.name }}</span>

              <ChevronUpIcon v-if="expand.category" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5 text-neutral-300" />
            </div>
          </div>

          <transition name="slide-down">
            <div
              v-if="expand.category"
              class="
                flex
                gap-4
                overflow-x-auto
                pt-2
                pb-4
                relative
                z-0
                bg-dark-100
                no-scrollbar
              "
            >
              <div
                v-for="(category, index) in visibleCategories"
                :key="category.id"
                @click="
                  form.category = {
                    id: category.id,
                    name: category.name,
                    icon: category.icon,
                    color: category.color,
                  }
                "
                class="
                  flex
                  items-center
                  gap-2
                  flex-shrink-0
                  rounded-lg
                  py-2
                  px-4
                  sm:cursor-pointer
                "
                :class="[
                  index === 0
                    ? 'ml-4'
                    : index === visibleCategories.length - 1
                    ? 'mr-4'
                    : '',
                ]"
                :style="{ background: category.color }"
              >
                <BaseIcon :name="category.icon.toLowerCase()" />
                <span class="font-medium">{{ category.name }}</span>
              </div>
            </div>
          </transition>
        </div>

        <div class="mb-[1px]" v-else>
          <div class="flex justify-between px-4 py-2 relative z-10 bg-dark-100">
            <div class="flex gap-2 items-center justify-center">
              <div class="p-3">
                <BaseIcon name="paper-plane" />
              </div>
              <span>To Account</span>
            </div>
            <div
              class="flex gap-2 items-center justify-center sm:cursor-pointer"
              @click="toggleAccordion('destinationAccount')"
            >
              <span v-if="!form.destinationAccount.name" class="text-error-200">
                Required
              </span>
              <span class="uppercase">{{ form.destinationAccount.name }}</span>
              <ChevronUpIcon v-if="expand.destinationAccount" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5 text-neutral-300" />
            </div>
          </div>

          <transition name="slide-down">
            <div
              v-if="expand.destinationAccount"
              class="
                flex
                gap-4
                overflow-x-auto
                pt-2
                pb-4
                relative
                z-0
                bg-dark-100
                no-scrollbar
                sm:cursor-pointer
              "
            >
              <span
                v-for="(account, index) in accounts"
                :key="account.id"
                class="py-2 px-4 rounded-lg flex-shrink-0 font-medium uppercase"
                :class="[
                  index === 0
                    ? 'ml-4'
                    : index === accounts.length - 1
                    ? 'mr-4'
                    : '',
                  form.destinationAccount.id === account.id
                    ? 'bg-shades-400'
                    : 'bg-white/10',
                ]"
                @click="
                  form.destinationAccount = {
                    name: account.name,
                    id: account.id,
                  }
                "
              >
                {{ account.name }}
              </span>
            </div>
          </transition>
        </div>

        <div class="mb-[1px]">
          <div
            class="
              flex
              justify-between
              items-center
              px-4
              py-2
              relative
              z-10
              bg-dark-100
            "
          >
            <div class="flex gap-2 items-center justify-center">
              <div class="h-10 w-10 grid place-items-center rounded-full">
                <BaseIcon name="calendar" />
              </div>
              <span>Time</span>
            </div>
            <div
              class="flex gap-2 items-center sm:cursor-pointer"
              @click="toggleAccordion('time')"
            >
              <span>{{ time }}</span>

              <ChevronUpIcon v-if="expand.time" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5 text-neutral-300" />
            </div>
          </div>
        </div>

        <transition name="slide-down">
          <div class="flex text-lg" v-if="expand.time">
            <VueScrollPicker :options="days" v-model="form.day" />
            <VueScrollPicker :options="hours" v-model="form.hour" />
            <VueScrollPicker :options="minutes" v-model="form.minute" />
          </div>
        </transition>

        <div>
          <div
            class="
              flex
              justify-between
              items-center
              px-4
              py-2
              relative
              z-10
              bg-dark-100
            "
          >
            <div class="flex gap-2 items-center justify-center">
              <div class="h-10 w-10 grid place-items-center rounded-full">
                <BaseIcon name="edit" />
              </div>
              <span>Note</span>
            </div>
            <div @click="collapseAll">
              <BaseInput v-model="form.note" />
            </div>
          </div>
        </div>
      </div>

      <div class="px-4">
        <BaseButton
          flavor="danger"
          label="Delete"
          type="button"
          size="sm"
          class="w-full mb-4"
          loading-label="Deleting"
          :loading="loading.delete"
          @click="confirmation = true"
        />
        <BaseButton
          label="Save"
          type="submit"
          size="sm"
          class="w-full"
          loading-label="Saving changes"
          :loading="loading.edit"
          :disabled="!formIsValid"
        />
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseInput from "./BaseInput.vue";
import BaseModal from "./BaseModal.vue";
import CurrencyInput from "./CurrencyInput.vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import mixin from "../mixin";
import API from "../api";
import { VueScrollPicker } from "vue-scroll-picker";

dayjs.extend(customParseFormat);

export default {
  name: "ModalRecordEdit",
  mixins: [mixin],
  emits: ["close"],
  components: {
    BaseButton,
    BaseIcon,
    BaseInput,
    BaseModal,
    ChevronUpIcon,
    ChevronDownIcon,
    CurrencyInput,
    VueScrollPicker,
  },
  data() {
    return {
      form: {
        id: 0,
        type: "expense",
        amount: 0,
        account: { name: "", id: 0 },
        destinationAccount: { name: "", id: 0 },
        category: { name: "", id: 0, color: "", icon: "" },
        day: "Today",
        hour: dayjs().format("HH"),
        minute: dayjs().format("mm"),
        note: "",
      },
      formIsValid: false,
      expand: {
        account: false,
        category: false,
        destinationAccount: false,
        time: false,
      },
      loading: {
        edit: false,
        delete: false,
      },
      confirmation: false,
    };
  },
  computed: {
    record() {
      return this.$store.state.record;
    },
    accounts() {
      return this.$store.state.accounts;
    },
    accountId() {
      return this.$store.state.accountId;
    },
    visibleCategories() {
      return this.$store.getters.visibleCategories;
    },
    days() {
      return this.getDates(new Date("2021-01-01T17:00:00.000Z"), new Date());
    },
    hours() {
      return Array.from({ length: 24 }, (_, index) =>
        index.toString().length < 2 ? "0" + index : index.toString()
      );
    },
    minutes() {
      return Array.from({ length: 60 }, (_, index) =>
        index.toString().length < 2 ? "0" + index : index.toString()
      );
    },
    time() {
      return `${this.form.day}, ${this.form.hour}:${this.form.minute}`;
    },
  },
  methods: {
    async handleSubmit() {
      const { id, type, note, account, category, amount, destinationAccount } =
        this.form;

      let time = "";
      if (this.form.day === "Today") {
        const todayDate = dayjs().format("D MMM YYYY");
        const todayCompleteDate = `${todayDate}, ${this.form.hour}:${this.form.minute}`;
        time = dayjs(todayCompleteDate, "D MMM YYYY HH:mm").format();
      } else {
        time = dayjs(this.time, "D MMM YYYY HH:mm").format();
      }

      const payload = {
        type,
        note,
        amount: type === "expense" ? amount * -1 : amount,
        time,
        AccountId: account.id,
        CategoryId: type !== "transfer" ? category.id : null,
        DestinationAccountId: destinationAccount.id || null,
      };
      try {
        this.loading.edit = true;
        await API.put(`/records/${id}`, payload);
        this.$emit("close");
        if (this.$store.state.modal.accountDetail) {
          this.$store.commit("SET_LOADING", { type: "account", payload: true });
          this.$store.commit("SET_LOADING", {
            type: "accountRecords",
            payload: true,
          });

          await this.$store.dispatch("loadAccount", this.accountId);
          await this.$store.dispatch("loadAccountRecords");
        }
        this.$store.commit("SET_LOADING", {
          type: "recentRecords",
          payload: true,
        });
        this.$store.commit("SET_LOADING", { type: "accounts", payload: true });

        await this.$store.dispatch("loadAccounts");
        await this.$store.dispatch("loadRecentRecords");
      } catch (error) {
        this.revealError(error);
      }
      this.loading.edit = false;
    },
    async deleteRecord() {
      try {
        this.loading.delete = true;
        await API.delete(`/records/${this.form.id}`);
        this.$emit("close");
        if (this.$store.state.modal.accountDetail) {
          this.$store.commit("SET_LOADING", { type: "account", payload: true });
          this.$store.commit("SET_LOADING", {
            type: "accountRecords",
            payload: true,
          });

          await this.$store.dispatch("loadAccount", this.accountId);
          await this.$store.dispatch("loadAccountRecords");
        }
        this.$store.commit("SET_LOADING", {
          type: "recentRecords",
          payload: true,
        });
        this.$store.commit("SET_LOADING", { type: "accounts", payload: true });

        await this.$store.dispatch("loadAccounts");
        await this.$store.dispatch("loadRecentRecords");
      } catch (error) {
        this.revealError(error);
      }
      this.loading.delete = false;
    },
    toggleAccordion(field) {
      let expandClone = { ...this.expand };
      for (let key in expandClone) {
        expandClone[key] = false;
      }
      expandClone[field] = !this.expand[field];
      this.expand = { ...expandClone };
    },
    collapseAll() {
      for (let key in this.expand) {
        this.expand[key] = false;
      }
    },
  },
  watch: {
    form: {
      deep: true,
      handler(newVal) {
        if (this.form.type !== "transfer") {
          if (newVal.category.id) {
            this.formIsValid = true;
          } else {
            this.formIsValid = false;
          }
        } else {
          if (newVal.destinationAccount.id) {
            this.formIsValid = true;
          } else {
            this.formIsValid = false;
          }
        }
      },
    },
  },
  async mounted() {
    this.form = this.record;
    // if (this.form.type === "transfer") {
    //   /* to populate income & expense's category field */
    //   const { name, id, color, icon } = this.visibleCategories[0];
    //   this.form.category = { name, id, color, icon };
    // }
  },
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.15s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%) !important;
}
</style>