<template>
  <BaseModal v-model="confirmation" permanent>
    <div class="bg-dark-300 text-neutral-100 rounded-t-3xl">
      <header class="bg-dark-100 p-4 relative rounded-t-3xl">
        <h1 class="font-bold text-center">Delete Confirmation</h1>
      </header>

      <section class="pt-4 pb-6">
        <p class="text-center mb-4">
          You cannot undo this action. Are you sure you want to delete this
          account?
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
            @click="deleteAccount"
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
      <h1 class="font-bold text-center">Edit Account</h1>
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
              <div class="p-2">
                <BaseIcon name="palette" />
              </div>
              <span>Color</span>
            </div>
            <div
              class="flex gap-2 items-center justify-center sm:cursor-pointer"
              @click="expand.color = !expand.color"
            >
              <span
                class="h-4 w-7 rounded-full"
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
          flavor="danger"
          label="Delete"
          type="button"
          size="md"
          class="w-full mb-4"
          loading-label="Deleting"
          :loading="loading.delete"
          @click="confirmation = true"
        />
        <BaseButton
          label="Save"
          type="submit"
          size="md"
          class="w-full"
          loading-label="Saving changes"
          :loading="loading.edit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import mixin from "../mixin";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseInput from "./BaseInput.vue";
import BaseModal from "./BaseModal.vue";
import CurrencyInput from "./CurrencyInput.vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import { COLORS } from "../constants";
import API from "../api";

export default {
  name: "ModalAccountEdit",
  emits: ["close", "closeAndRefetch", "deleted"],
  components: {
    BaseButton,
    BaseIcon,
    BaseInput,
    BaseModal,
    ChevronUpIcon,
    ChevronDownIcon,
    CurrencyInput,
  },
  mixins: [mixin],
  data() {
    return {
      form: {
        name: "",
        currentBalance: 0,
        color: "",
      },
      expand: {
        color: false,
      },
      loading: {
        delete: false,
        edit: false,
      },
      confirmation: false,
    };
  },
  computed: {
    colors() {
      return COLORS;
    },
    accountId() {
      return this.$store.state.accountId;
    },
    account() {
      return this.$store.state.account;
    },
  },
  methods: {
    async handleSubmit() {
      const payload = {
        name: this.form.name,
        current_balance: this.form.currentBalance,
        color: this.form.color,
      };
      try {
        this.loading.edit = true;
        await API.put(`/accounts/${this.accountId}`, payload);
        this.$emit("closeAndRefetch");
      } catch (error) {
        this.revealError(error);
      }
      this.loading.edit = false;
    },
    async deleteAccount() {
      try {
        this.loading.delete = true;
        await API.delete(`/accounts/${this.accountId}`);
        this.$emit("deleted");
      } catch (error) {
        this.revealError(error);
      }
      this.loading.delete = false;
    },
    prefillAccount() {
      const { name, color, current_balance } = this.account;
      this.form = { name, color, currentBalance: current_balance };
    },
  },
  mounted() {
    this.prefillAccount();
  },
};
</script>
