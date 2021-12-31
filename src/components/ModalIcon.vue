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

      <h1 class="font-bold text-center">Icons</h1>
    </header>

    <section
      class="overflow-y-auto pt-4"
      :style="{ 'max-height': 'calc(96vh - 112px)' }"
    >
      <div class="grid grid-cols-5 place-items-center">
        <span
          v-for="icon in icons"
          :key="icon"
          class="flex justify-center items-center w-full h-16"
          @click="$emit('setIcon', icon)"
        >
          <BaseIcon :name="icon" :height="16" :width="16" />
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import { ICONS } from "../constants";
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "ModalIcon",
  components: {
    ChevronLeftIcon,
    BaseIcon,
  },
  computed: {
    icons() {
      return ICONS;
    },
  },
};
</script>
