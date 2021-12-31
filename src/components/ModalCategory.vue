<template>
  <div class="bg-dark-300 text-neutral-100 rounded-t-3xl" style="height: 96vh">
    <header class="bg-dark-100 p-4 relative rounded-t-3xl">
      <button
        @click="$emit('close')"
        class="text-error-200 absolute flex items-center"
      >
        <ChevronLeftIcon class="h-5 w-5" />
        <span>Back</span>
      </button>

      <h1 class="font-bold text-center">Categories</h1>

      <!-- <input
        v-model="search"
        class="rounded-lg bg-dark-300 w-full py-1.5 px-3"
        placeholder="Search category"
      /> -->
    </header>

    <section
      class="overflow-y-auto pt-4"
      :style="{ 'max-height': 'calc(96vh - 56px)' }"
    >
      <button
        v-for="category in categories"
        :key="category.id"
        @click="openCategoryEdit(category)"
        class="
          flex
          items-center
          justify-between
          py-2
          px-4
          bg-dark-100
          border-b border-b-dark-300
          w-full
        "
      >
        <div class="flex items-center gap-2">
          <div
            class="
              rounded-full
              bg-shades-400
              h-9
              w-9
              grid
              place-items-center
              relative
            "
            :style="{ background: category.color }"
          >
            <BaseIcon :name="category.icon" />
          </div>
          <span class="text-sm">{{ category.name }}</span>
        </div>

        <ChevronRightIcon class="h-5 w-5 text-white" />
      </button>
    </section>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import BaseIcon from "./BaseIcon.vue";
import BaseInput from "./BaseInput.vue";

export default {
  name: "ModalCategory",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    BaseIcon,
    BaseInput,
  },
  // data() {
  //   return {
  //     search: "",
  //   };
  // },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    openCategoryEdit(category) {
      this.$store.commit("SET_CATEGORY", category);
      this.$store.commit("SET_MODAL", { type: "categoryEdit", payload: true });
    },
  },
  async mounted() {
    await this.$store.dispatch("loadCategories");
  },
};
</script>
