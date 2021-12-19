<template>
  <router-link
    class="flex flex-col items-center gap-1 w-14"
    :to="to"
    v-slot="{ isActive }"
  >
    <BaseIcon
      :name="icon"
      :height="20"
      :width="20"
      :color="isActive ? 'white' : 'currentColor'"
    />
    <span :class="isActive ? 'font-semibold text-white' : 'font-medium'">{{ label }}</span>
  </router-link>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "BaseNavItem",
  components: {
    BaseIcon,
  },
  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
};
</script>