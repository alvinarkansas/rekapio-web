<template>
  <input
    class="bg-transparent focus:outline-none w-full text-right"
    :class="classes"
    :type="type"
    :placeholder="placeholder"
    spellcheck="false"
    v-maska="mask"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <slot />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    mask: {
      type: String,
      default: "",
    },
    classes: {
      type: String,
    },
  },
};
</script>
