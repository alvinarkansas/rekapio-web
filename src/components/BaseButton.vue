<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    class="
      flex
      items-center
      justify-center
      font-semibold
      transition-all
      rounded-lg
      p-3
    "
    :class="`bg-${bgColor} text-${color}`"
  >
    <div class="grid grid-flow-col auto-cols-max gap-2">
      <div v-if="icon" class="h-full w-full flex items-center justify-center">
        <BaseIcon
          :name="loading ? 'loading' : icon"
          :class="{ 'animate-spin': loading }"
        />
      </div>
      <div
        v-if="!icon && loading"
        class="h-full w-full flex items-center justify-center"
      >
        <BaseIcon name="loading" :class="{ 'animate-spin': loading }" />
      </div>
      <div v-if="label" class="h-full w-full flex items-center">
        <p v-if="!loading" :class="`text-${size}`">{{ buttonLabel }}</p>
        <template v-else>
          <p v-if="buttonLoadingLabel" :class="`text-${size}`">
            {{ buttonLoadingLabel }}
          </p>
        </template>
      </div>
    </div>
  </button>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "BaseButton",
  props: {
    bgColor: {
      type: String,
      default: "primary",
    },
    color: {
      type: String,
      default: "white",
    },
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "xs",
    },
    icon: {
      type: String,
      default: "",
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingLabel: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseIcon,
  },
  computed: {
    buttonLabel() {
      return this.uppercase ? this.label.toUpperCase() : this.label;
    },
    buttonLoadingLabel() {
      return this.uppercase
        ? this.loadingLabel.toUpperCase()
        : this.loadingLabel;
    },
  },
};
</script>

<style>
</style>