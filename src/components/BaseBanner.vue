<template>
  <transition name="slide-down">
    <div
      class="fixed top-0 inset-x-0 bg-primary p-4 text-neutral-100"
      v-if="modelValue"
    >
      <slot />

      <div class="flex gap-2 items-center justify-end">
        <BaseButton
          label="Dismiss"
          size="sm"
          flavor="clear"
          class="w-28"
          @click="$emit('dismiss')"
        />
        <BaseButton
          label="Install"
          size="sm"
          flavor="warning"
          class="w-28"
          @click="$emit('proceed')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseBanner",
  components: {
    BaseButton,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%) !important;
}
</style>
