<template>
  <div class="bg-dark-300 text-neutral-100 rounded-t-3xl">
    <header class="bg-dark-100 p-4 relative rounded-t-3xl">
      <button @click="$emit('close')" class="text-error-200 absolute">
        Cancel
      </button>
      <h1 class="font-bold text-center">Edit Record</h1>
    </header>

    <div class="pt-4">
      <div
        class="h-16 w-16 grid place-items-center rounded-full mx-auto"
        :style="{ background: form.color }"
      >
        <BaseIcon :name="form.icon" :height="24" :width="24" />
      </div>
    </div>

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
            <BaseInput v-model="form.name" placeholder="Category name" />
          </div>
        </div>

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
          @click="openIconModal"
        >
          <div class="flex gap-2 items-center justify-center">
            <div class="h-10 w-10 grid place-items-center rounded-full">
              <BaseIcon name="folder" />
            </div>
            <span>Icon</span>
          </div>
          <div class="flex gap-2 items-center justify-center">
            <BaseIcon :name="form.icon" :height="16" :width="16" />
            <ChevronRightIcon class="h-5 w-5" />
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
              class="flex gap-2 items-center justify-center"
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
                class="flex-shrink-0 w-12 h-12 rounded-full"
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
          label="Save"
          type="submit"
          size="sm"
          class="w-full"
          loading-label="Saving changes"
          :loading="loading"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { COLORS } from "../constants";
import mixin from "../mixin";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "../components/BaseIcon.vue";
import BaseInput from "../components/BaseInput.vue";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";
import API from "../api";

export default {
  name: "ModalCategoryEdit",
  components: {
    BaseButton,
    BaseIcon,
    BaseInput,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  },
  mixins: [mixin],
  data() {
    return {
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
    category() {
      return this.$store.state.category;
    },
    form() {
      return this.$store.state.categoryEditForm;
    },
  },
  methods: {
    async handleSubmit() {
      try {
        const payload = {
          name: this.form.name,
          icon: this.form.icon,
          color: this.form.color,
        };
        this.loading = true;
        await API.put(`/categories/${this.form.id}`, payload);
        this.$store.commit("SET_MODAL", {
          type: "categoryEdit",
          payload: false,
        });
        this.$store.dispatch("loadCategories");
      } catch (error) {
        this.revealError(error);
      }
      this.loading = false;
    },
    openIconModal() {
      this.$store.commit("SET_MODAL", { type: "icon", payload: true });
    },
  },
  mounted() {
    this.$store.commit("SET_CATEGORY_EDIT_FORM", {
      id: this.category.id,
      name: this.category.name,
      icon: this.category.icon,
      color: this.category.color,
    });
  },
};
</script>
