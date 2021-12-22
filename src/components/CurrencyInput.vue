<template>
  <input
    type="tel"
    inputmode="numeric"
    :value="formattedValue"
    @input="change"
    class="bg-transparent focus:outline-none text-right w-full"
    :class="classes"
  />
</template>

<script>
import { format, unformat, defaults } from "../utils/currency";

export default {
  name: "Money",
  props: {
    modelValue: {
      required: true,
      type: [Number, String],
      default: 0,
    },
    masked: {
      type: Boolean,
      default: false,
    },
    precision: {
      type: Number,
      default: () => defaults.precision,
    },
    decimal: {
      type: String,
      default: () => defaults.decimal,
    },
    thousands: {
      type: String,
      default: () => defaults.thousands,
    },
    prefix: {
      type: String,
      default: () => defaults.prefix,
    },
    suffix: {
      type: String,
      default: () => defaults.suffix,
    },
    classes: {
      type: [String, Object],
    },
  },
  data() {
    return {
      formattedValue: "",
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue, oldValue) {
        let formatted = format(newValue, this.$props);
        if (formatted !== this.formattedValue) {
          this.formattedValue = formatted;
        }
      },
    },
  },
  methods: {
    change(e) {
      this.$emit(
        "update:modelValue",
        this.masked ? e.target.value : unformat(e.target.value, this.precision)
      );
    },
  },
};
</script>
