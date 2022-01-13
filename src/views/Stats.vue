<template>
  <BaseModal v-model="modal.startDate">
    <div class="bg-dark-300 text-neutral-100 rounded-t-3xl">
      <header class="bg-dark-100 p-4 relative rounded-t-3xl">
        <h1 class="font-bold text-center">Start Date</h1>
        <BaseButton
          icon-only
          icon="cross"
          color="white"
          flavor="clear"
          class="absolute right-2 top-2"
          @click="modal.startDate = false"
        />
      </header>

      <div class="flex text-lg">
        <VueScrollPicker :options="days" v-model="customStartDate" />
      </div>
    </div>
  </BaseModal>

  <BaseModal v-model="modal.endDate">
    <div class="bg-dark-300 text-neutral-100 rounded-t-3xl">
      <header class="bg-dark-100 p-4 relative rounded-t-3xl">
        <h1 class="font-bold text-center">End Date</h1>
        <BaseButton
          icon-only
          icon="cross"
          color="white"
          flavor="clear"
          class="absolute right-2 top-2"
          @click="modal.endDate = false"
        />
      </header>

      <div class="flex text-lg">
        <VueScrollPicker :options="days" v-model="customEndDate" />
      </div>
    </div>
  </BaseModal>

  <div class="mb-[52px]">
    <section class="px-4 mb-8">
      <h2 class="mb-4 font-bold text-lg">Statistics</h2>
    </section>

    <section class="px-4 mb-8" v-if="loading || summary.length">
      <PieChart
        v-if="!loading"
        :data="summary"
        @segmentClick="handleSegmentClick"
      />
      <div class="pt-[9.5px] pb-[10px]" v-else>
        <div
          class="
            w-[268px]
            h-[268px]
            rounded-full
            bg-neutral-300
            animate-pulse
            mx-auto
            relative
          "
        >
          <div
            class="
              absolute
              top-1/2
              left-1/2
              transform
              -translate-y-1/2 -translate-x-1/2
              w-[180px]
              h-[180px]
              rounded-full
              bg-dark-300
            "
          ></div>
        </div>
      </div>
    </section>

    <section class="px-4 shadow-md">
      <div class="w-full py-4 bg-dark-100 rounded-lg">
        <div class="flex justify-between items-center mb-4 px-4">
          <h2 class="font-bold text-lg">By Category</h2>
          <p
            v-if="!loading"
            class="rounded-full text-xs font-semibold bg-dark-300 py-1 px-3"
          >
            {{ toRupiah(totalSpent) }}
          </p>
          <div
            v-else
            class="h-4 w-24 bg-neutral-300 rounded-md animate-pulse"
          />
        </div>

        <template v-if="!loading">
          <template v-if="summary.length">
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

          <div v-else class="h-80 px-4 grid place-items-center">
            <p class="text-sm text-center">
              No record to be summarized for
              <b v-if="selectedTime?.name !== 'Custom'">{{
                selectedTime?.name.toLowerCase()
              }}</b>
              <template v-else>your selected time range</template>
            </p>
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
  </div>

  <div
    v-if="!isValid"
    class="
      fixed
      bottom-32
      inset-x-4
      rounded-md
      py-2
      px-4
      text-neutral-100
      bg-error-300
    "
  >
    <p class="text-sm">Start date should be before end date</p>
  </div>

  <section
    class="
      fixed
      bottom-14
      inset-x-0
      bg-dark-100
      flex
      gap-2
      pl-4
      pr-2
      py-2
      items-center
      justify-between
    "
  >
    <span
      v-if="selectedTime?.name !== 'Custom'"
      class="
        text-sm
        font-medium
        px-4
        py-2
        w-full
        text-right
        bg-dark-300
        rounded-md
        shadow-md
      "
    >
      {{ selectedTime?.name }}
    </span>
    <div v-else class="flex gap-2 items-center flex-grow">
      <span
        @click="modal.startDate = true"
        class="
          text-sm
          font-medium
          px-4
          py-2
          w-full
          text-center
          bg-dark-300
          rounded-md
          shadow-md
        "
        :class="{ 'ring-2 ring-error-300': !isValid }"
      >
        {{ customStartDate }}
      </span>
      <span class="grid place-items-center">
        <BaseIcon name="minus-small" :width="20" :height="20" />
      </span>
      <span
        @click="modal.endDate = true"
        class="
          text-sm
          font-medium
          px-4
          py-2
          w-full
          text-center
          bg-dark-300
          rounded-md
          shadow-md
        "
        :class="{ 'ring-2 ring-error-300': !isValid }"
      >
        {{ customEndDate }}
      </span>
      <BaseButton
        :disabled="!isValid || loading"
        icon-only
        icon="search"
        color="white"
        class="p-[10px] shadow-sm rounded-md"
        @click="loadSummary"
      />
    </div>

    <Listbox v-model="selectedTime">
      <div class="relative">
        <ListboxButton
          v-slot="{ open }"
          class="
            relative
            cursor-default
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-opacity-75
            focus-visible:ring-white
            focus-visible:ring-offset-orange-300
            focus-visible:ring-offset-2
            focus-visible:border-indigo-500
          "
        >
          <span
            class="grid place-items-center p-2 pointer-events-none rounded-md"
            :class="{ 'shadow-md bg-dark-300': open }"
          >
            <SelectorIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="
              absolute
              bottom-full
              right-0
              w-32
              p-1
              mb-5
              overflow-auto
              bg-dark-300
              rounded-lg
              shadow-3xl
              max-h-60
              ring-1 ring-black ring-opacity-5
              focus:outline-none
            "
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in timeOption"
              :key="option.name"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-neutral-50 bg-shades-500' : 'text-neutral-100',
                  'cursor-default select-none relative py-2 pr-4 rounded-md text-sm text-right',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ option.name }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </section>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import BaseIcon from "../components/BaseIcon.vue";
import BaseModal from "../components/BaseModal.vue";
import PieChart from "../components/PieChart.vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { VueScrollPicker } from "vue-scroll-picker";
import dayjs from "dayjs";
import API from "../api";
import mixin from "../mixin";

export default {
  name: "Stats",
  mixins: [mixin],
  components: {
    BaseButton,
    BaseIcon,
    BaseModal,
    CheckIcon,
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    PieChart,
    SelectorIcon,
    VueScrollPicker,
  },
  data() {
    return {
      summary: [],
      totalSpent: 0,
      timeOption: [
        { name: "This Month", start: dayjs().startOf("month"), end: dayjs() },
        { name: "This Week", start: dayjs().startOf("week"), end: dayjs() },
        {
          name: "Last 7 Days",
          start: dayjs().subtract(7, "day").startOf("day"),
          end: dayjs(),
        },
        {
          name: "Last 30 Days",
          start: dayjs().subtract(30, "day").startOf("day"),
          end: dayjs(),
        },
        { name: "Today", start: dayjs().startOf("day"), end: dayjs() },
        { name: "Custom", start: dayjs().startOf("day"), end: dayjs() },
      ],
      selectedTime: null,
      modal: {
        startDate: false,
        endDate: false,
      },
      customStartDate: "",
      customEndDate: "",
      loading: false,
      isValid: true,
    };
  },
  computed: {
    days() {
      return this.getDates(new Date("2021-01-01T17:00:00.000Z"), new Date());
    },
  },
  methods: {
    handleSegmentClick($event) {
      console.log("🔺", $event);
    },
    async loadSummary() {
      if (this.isValid) {
        const start = this.selectedTime.start.unix();
        const end = this.selectedTime.end.unix();

        try {
          this.loading = true;
          const { data } = await API.get(
            `/records/summary?start=${start}&end=${end}`
          );
          this.summary = data.summary.sort((a, b) => b.spent - a.spent);
          this.totalSpent = 0;
          this.summary.forEach((el) => {
            this.totalSpent += el.spent;
          });
        } catch (error) {
          this.revealError(error);
        }
        this.loading = false;
      }
    },
  },
  watch: {
    selectedTime(newVal) {
      if (newVal.name !== "Custom") {
        const customOption = this.timeOption[this.timeOption.length - 1];
        customOption.start = this.selectedTime.start;
        customOption.end = this.selectedTime.end;

        if (this.selectedTime.start.diff(dayjs(), "day") !== 0) {
          this.customStartDate = this.selectedTime.start.format("D MMM YYYY");
        } else {
          this.customStartDate = "Today";
        }

        if (this.selectedTime.end.diff(dayjs(), "day") !== 0) {
          this.customEndDate = this.selectedTime.end.format("D MMM YYYY");
        } else {
          this.customEndDate = "Today";
        }

        this.isValid = true;

        this.loadSummary();
      }
    },
    customStartDate(newVal) {
      if (newVal !== "Today") {
        this.selectedTime.start = dayjs(newVal).startOf("day");
      } else {
        this.selectedTime.start = dayjs().startOf("day");
      }

      const formattedEndTreshold = this.selectedTime.end.format("YYYY-MM-DD");
      if (this.selectedTime.start.isAfter(formattedEndTreshold, "day")) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
    customEndDate(newVal) {
      if (newVal !== "Today") {
        this.selectedTime.end = dayjs(newVal).endOf("day");
      } else {
        this.selectedTime.end = dayjs();
      }

      const formattedStartTreshold =
        this.selectedTime.start.format("YYYY-MM-DD");
      if (this.selectedTime.end.isBefore(formattedStartTreshold, "day")) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
  },
  mounted() {
    this.selectedTime = this.timeOption[0];
  },
};
</script>
