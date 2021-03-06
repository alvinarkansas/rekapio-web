<template>
  <div class="bg-dark-300 text-neutral-100 rounded-t-3xl">
    <header class="bg-dark-100 p-4 relative rounded-t-3xl">
      <button @click="$emit('close')" class="text-error-200 absolute">
        Cancel
      </button>
      <h1 class="font-bold text-center">Add Account</h1>
    </header>

    <form
      class="overflow-y-auto py-4 flex flex-col gap-4"
      style="max-height: calc(85vh - 56px)"
      @submit.prevent="handleSubmit"
    >
      <div class="text-sm">
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
            mb-[1px]
          "
        >
          <div class="flex gap-2 items-center justify-center">
            <div class="h-10 w-10 grid place-items-center rounded-full">
              <BaseIcon name="letter-case" />
            </div>
            <span>Name</span>
          </div>
          <div>
            <BaseInput
              v-model="form.name"
              placeholder="Account name"
              classes="uppercase placeholder:normal-case"
            />
          </div>
        </div>

        <div class="bg-dark-100 grid grid-cols-2 px-4 py-3 mb-[1px]">
          <div class="flex gap-2 items-center">
            <div class="h-10 w-10 grid place-items-center rounded-full">
              <BaseIcon name="money" />
            </div>
            <span>Current Balance</span>
          </div>
          <div
            class="grid grid-flow-col gap-2 place-items-center text-neutral-300"
          >
            <CurrencyInput
              v-model="form.currentBalance"
              prefix="Rp "
              class="w-full"
            />
          </div>
        </div>

        <div>
          <div class="flex justify-between px-4 py-3 relative z-10 bg-dark-100">
            <div class="flex gap-2 items-center justify-center">
              <div class="h-10 w-10 grid place-items-center rounded-full">
                <BaseIcon name="palette" />
              </div>
              <span>Color</span>
            </div>
            <div
              class="flex gap-2 items-center justify-center sm:cursor-pointer"
              @click="expand.color = !expand.color"
            >
              <span v-if="!form.color" class="text-error-200">Required</span>
              <span
                v-else
                class="h-3 w-5 rounded-full"
                :style="{ background: form.color }"
              />
              <ChevronUpIcon v-if="expand.color" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5 text-neutral-300" />
            </div>
          </div>

          <transition name="slide-down" appear>
            <div
              v-if="expand.color"
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
                v-for="(color, index) in colors"
                :key="index"
                @click="form.color = color"
                class="flex-shrink-0 w-12 h-12 rounded-full sm:cursor-pointer"
                :class="[
                  index === 0
                    ? 'ml-4'
                    : index === colors.length - 1
                    ? 'mr-4'
                    : '',
                  form.color === color
                    ? 'ring-2 ring-shades-300 ring-offset-2 ring-offset-dark-100'
                    : '',
                ]"
                :style="{ background: color }"
              />
            </div>
          </transition>
        </div>
      </div>

      <div class="px-4">
        <BaseButton
          label="Add"
          type="submit"
          size="sm"
          class="w-full"
          loading-label="Adding account"
          :loading="loading"
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
import CurrencyInput from "./CurrencyInput.vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import { COLORS } from "../constants";
import API from "../api";
import mixin from "../mixin";

export default {
  name: "ModalAccountAdd",
  mixins: [mixin],
  emits: ["closeAndRefetch", "close"],
  components: {
    BaseButton,
    BaseIcon,
    BaseInput,
    ChevronUpIcon,
    ChevronDownIcon,
    CurrencyInput,
  },
  data() {
    return {
      form: {
        name: "",
        currentBalance: 0,
        color: "",
      },
      formIsValid: false,
      expand: {
        color: false,
      },
      loading: false,
    };
  },
  computed: {
    colors() {
      return COLORS;
    },
  },
  methods: {
    async handleSubmit() {
      const payload = {
        name: this.form.name,
        current_balance: this.form.currentBalance,
        color: this.form.color,
      };
      this.loading = true;
      try {
        await API.post("/accounts", payload);
        this.$emit("closeAndRefetch");
      } catch (error) {
        this.revealError(error);
      }
      this.loading = false;
    },
  },
  watch: {
    form: {
      deep: true,
      handler(newVal) {
        if (newVal.name && newVal.color) {
          this.formIsValid = true;
        } else {
          this.formIsValid = false;
        }
      },
    },
  },
};
</script>
