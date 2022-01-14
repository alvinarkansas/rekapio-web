<template>
  <div class="w-full flex justify-center h-72 relative">
    <svg class="pie">
      <circle
        v-for="(item, index) in dataObjects"
        @click="handleSegmentClick(item)"
        :key="index"
        :style="{
          strokeDasharray: `${item.relativeSize} ${circleLength}`,
          strokeDashoffset: item.offset,
          stroke: item.color,
          strokeWidth: activeSegment?.name === item?.name ? 52 : 44,
        }"
        r="38%"
        cx="50%"
        cy="50%"
      />
    </svg>
    <div
      v-if="activeSegment"
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-y-1/2 -translate-x-1/2
      "
    >
      <h2 class="text-sm text-center font-medium mb-1">
        {{ activeSegment?.name }}
      </h2>
      <p class="text-xs text-center">{{ toRupiah(activeSegment?.amount) }}</p>
    </div>
  </div>
</template>

<script>
import mixin from "../mixin";

export default {
  name: "PieChart",
  mixins: [mixin],
  emits: ["segmentClick"],
  props: {
    data: {
      type: Object,
      default: [],
    },
  },
  data() {
    return {
      circleLength: 701.4033203125,
      activeSegment: null,
      hasMounted: false,
    };
  },
  methods: {
    handleSegmentClick(item) {
      this.activeSegment = item;
      this.$emit("segmentClick", item);
    },
  },
  computed: {
    dataTotal() {
      let total = 0;
      for (let datum of this.data) {
        total += datum.spent;
      }
      return total;
    },
    dataObjects() {
      let startingPoint = 1;

      return this.data.map((item) => {
        let relativeSize = (item.spent / this.dataTotal) * this.circleLength;
        let dataObject = {
          relativeSize: relativeSize,
          offset: -startingPoint,
          amount: item.spent,
          color: item.category_color,
          name: item.category_name,
        };
        startingPoint += relativeSize;
        return dataObject;
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.hasMounted = true;
    }, 0);
  },
};
</script>

<style>
.pie circle {
  fill: none;
  stroke-width: 44;
  transition: stroke-dasharray 0.3s ease-in-out,
    stroke-dashoffset 0.3s ease-in-out, stroke-width 0.2s ease-in-out;
}
</style>