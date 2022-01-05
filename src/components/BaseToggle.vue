<template>
  <Switch
    v-model="modelValue"
    @click="$emit('switch', modelValue)"
    :class="modelValue ? 'bg-shades-500' : 'bg-neutral-400'"
    class="
      relative
      inline-flex
      flex-shrink-0
      h-[28px]
      w-[52px]
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors
      ease-in-out
      duration-200
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-white
      focus-visible:ring-opacity-75
    "
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      :class="modelValue ? 'translate-x-6' : 'translate-x-0'"
      class="
        pointer-events-none
        inline-block
        h-[24px]
        w-[24px]
        rounded-full
        bg-white
        shadow-lg
        transform
        ring-0
        transition
        ease-in-out
        duration-200
      "
    />
  </Switch>
</template>

<script>
import { Switch } from "@headlessui/vue";

export default {
  components: { Switch },
  emits: ['switch'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
