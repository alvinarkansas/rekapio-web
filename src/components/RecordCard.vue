<template>
  <div class="flex justify-between" :class="classes">
    <div class="flex gap-2">
      <div
        class="rounded-full bg-shades-400 h-9 w-9 grid place-items-center"
        :style="{ background: iconColor }"
      >
        <BaseIcon color="white" :name="iconName" />
      </div>
      <div>
        <p class="text-sm font-medium mb-1">{{ category }}</p>
        <p class="text-neutral-300 text-xxs">{{ note }}</p>
      </div>
    </div>
    <div class="text-right">
      <p
        class="text-sm mb-1"
        :class="amount < 0 ? 'text-error-200' : 'text-green-500'"
      >
        {{ toRupiah(amount) }}
      </p>
      <p class="text-xxs text-neutral-300">{{ formattedTime }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import mixin from "../mixin";
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "RecordCard",
  mixins: [mixin],
  components: {
    BaseIcon,
  },
  props: {
    iconName: String,
    iconColor: String,
    category: String,
    note: String,
    amount: Number,
    time: String,
    classes: String,
  },
  computed: {
    formattedTime() {
      return dayjs(this.time).format("HH.mm");
    },
  },
};
</script>

<style>
</style>