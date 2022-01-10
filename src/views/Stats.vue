<template>
  <section class="px-4 mb-8">
    <h2 class="mb-4 font-bold text-lg">Statistics</h2>
  </section>

  <section class="px-4">
    <div class="w-full py-4 bg-dark-100 rounded-lg">
      <h2 class="mb-4 px-4 font-bold text-lg">By Category</h2>

      <template v-if="!loading">
        <div
          v-for="(item, index) in summary"
          :key="index"
          class="flex justify-between items-center px-4"
          :class="{ 'mb-4': index !== summary.length - 1 }"
        >
          <div class="flex gap-2 items-center">
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
              :style="{ background: item.category_color }"
            >
              <BaseIcon color="white" :name="item.category_icon" />
            </div>
            <p class="text-sm font-medium">
              {{ item.category_name }}
            </p>
          </div>

          <p class="text-sm">{{ toRupiah(item.spent) }}</p>
        </div>
      </template>

      <template v-else>
        <div
          v-for="i in 5"
          :key="i"
          class="flex justify-between items-center px-4"
          :class="{ 'mb-4': i !== 5 }"
        >
          <div class="flex gap-2 items-center">
            <span class="h-9 w-9 rounded-full bg-neutral-300 animate-pulse" />
            <div class="h-4 w-28 bg-neutral-300 rounded-md animate-pulse" />
          </div>

          <div class="h-4 w-16 bg-neutral-300 rounded-md animate-pulse" />
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import BaseIcon from "../components/BaseIcon.vue";
import dayjs from "dayjs";
import API from "../api";
import mixin from "../mixin";

export default {
  name: "Stats",
  mixins: [mixin],
  components: {
    BaseIcon,
  },
  data() {
    return {
      summary: [],
      filter: {
        start: dayjs().startOf("month"),
        end: dayjs(),
      },
      loading: false,
    };
  },
  methods: {
    async loadSummary() {
      const start = this.filter.start.unix();
      const end = this.filter.end.unix();

      try {
        this.loading = true;
        const { data } = await API.get(
          `/records/summary?start=${start}&end=${end}`
        );
        this.summary = data.summary.sort((a, b) => b.spent - a.spent);
      } catch (error) {
        this.revealError(error);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.loadSummary();
  },
};
</script>
