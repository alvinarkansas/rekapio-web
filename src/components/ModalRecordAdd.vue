<template>
  <div class="bg-dark-300 text-neutral-100">
    <header class="bg-dark-100 p-4 relative rounded-t-xl">
      <button @click="$emit('close')" class="text-error-200 absolute">
        Cancel
      </button>
      <h1 class="font-bold text-center">Add Record</h1>
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
            :class="form.type === 'expense' ? 'bg-shades-400' : ''"
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
            :class="form.type === 'income' ? 'bg-shades-400' : ''"
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
            :class="form.type === 'transfer' ? 'bg-shades-400' : ''"
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
              class="flex gap-2 items-center justify-center"
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
                class="py-2 px-4 rounded-lg flex-shrink-0 font-medium uppercase"
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
              <div
                class="h-10 w-10 grid place-items-center rounded-full"
                :style="{ background: form.category.color }"
              >
                <BaseIcon :name="form.category.icon" />
              </div>
              <span>Category</span>
            </div>
            <div
              class="flex gap-2 items-center justify-center"
              @click="toggleAccordion('category')"
            >
              <input
                class="bg-transparent focus:outline-none text-right w-full"
                type="hidden"
                placeholder="Select category"
              />
              <span>{{ form.category.name }}</span>

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
                v-for="(category, index) in categories"
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
                "
                :class="[
                  index === 0
                    ? 'ml-4'
                    : index === categories.length - 1
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
                <BaseIcon name="calendar" />
              </div>
              <span>Time</span>
            </div>
            <div>
              <BaseInput v-model="form.time" mask="##-##-#### ##:##" />
            </div>
          </div>
        </div>

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
            <div>
              <BaseInput v-model="form.note" />
            </div>
          </div>
        </div>
      </div>

      <div class="px-4">
        <button
          type="submit"
          class="
            px-3
            py-2
            bg-shades-300
            w-full
            rounded-md
            font-medium
            focus:outline-none
            focus:ring-2
            focus:ring-warning-300
            focus:ring-offset-2
            focus:ring-offset-primary
          "
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";
import BaseInput from "./BaseInput.vue";
import CurrencyInput from "./CurrencyInput.vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import mixin from "../mixin";
import API from "../api";

dayjs.extend(customParseFormat);

export default {
  name: "ModalRecordAdd",
  mixins: [mixin],
  components: {
    BaseIcon,
    BaseInput,
    ChevronUpIcon,
    ChevronDownIcon,
    CurrencyInput,
  },
  data() {
    return {
      form: {
        type: "expense",
        amount: 0,
        account: { name: "", id: 0 },
        category: { name: "", id: 0, color: "", icon: "" },
        time: "",
        note: "",
      },
      expand: {
        account: false,
        category: false,
      },
      curr: 0,
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    async handleSubmit() {
      const { type, note, account, category, time, amount } = this.form;
      console.log(time);
      console.log(dayjs(time, "DD-MM-YYYY HH:mm").month());
      console.log(dayjs(time, "DD-MM-YYYY HH:mm").format());
      const payload = {
        type,
        note,
        amount: type === "expense" ? amount * -1 : amount,
        time: dayjs(time, "DD-MM-YYYY HH:mm").format(),
        AccountId: account.id,
        CategoryId: category.id,
      };
      await API.post("/records", payload);
      this.$emit("closeAndRefetch");
    },
    toggleAccordion(field) {
      let expandClone = { ...this.expand };
      for (let key in expandClone) {
        expandClone[key] = false;
      }
      expandClone[field] = !this.expand[field];
      this.expand = { ...expandClone };
    },
  },
  async mounted() {
    await this.$store.dispatch("loadCategories");
    const { name, id, color, icon } = this.categories[0];
    this.form.category = { name, id, color, icon };
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