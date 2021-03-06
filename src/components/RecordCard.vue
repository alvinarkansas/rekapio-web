<template>
  <div class="flex justify-between sm:cursor-pointer" :class="classes">
    <div class="flex gap-2">
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
        :style="{ background: isTransferred ? '' : iconColor }"
      >
        <BaseIcon color="white" :name="isTransferred ? 'switch' : iconName" />
        <div
          v-if="accountColor && !isTransferred && !isOnDetailPage"
          class="account-dot outlined absolute -bottom-1 -right-1"
          :style="{ background: accountColor }"
        />
      </div>
      <div>
        <p class="text-sm font-medium mb-1">
          {{ isTransferred ? "Transfer" : category }}
        </p>
        <div v-if="isTransferred" class="text-xxs mb-1">
          <div class="flex gap-1 items-center uppercase">
            <div
              class="account-dot -mt-[2px]"
              :style="{ background: accountColor }"
            />
            <span>{{ accountName }}</span>
            <span>--></span>
            <div
              class="account-dot -mt-[2px]"
              :style="{ background: desAccountColor }"
            />
            <span>{{ desAccountName }}</span>
          </div>
        </div>
        <p class="text-neutral-300 text-xxs">{{ note }}</p>
      </div>
    </div>
    <div class="text-right">
      <p
        v-if="isTransferred && isOnDetailPage"
        class="text-sm mb-1"
        :class="
          accountId === desAccountId ? 'text-green-500' : 'text-error-200'
        "
      >
        {{
          accountId === desAccountId ? toRupiah(amount) : toRupiah(amount * -1)
        }}
      </p>
      <p
        v-else
        class="text-sm mb-1"
        :class="
          isTransferred
            ? 'text-neutral-100'
            : amount < 0
            ? 'text-error-200'
            : 'text-green-500'
        "
      >
        {{ toRupiah(amount) }}
      </p>
      <p class="text-xxs text-neutral-300">{{ time }}</p>
    </div>
  </div>
</template>

<script>
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
    accountColor: String,
    accountName: String,
    desAccountId: Number,
    desAccountName: String,
    desAccountColor: String,
    category: String,
    note: String,
    amount: Number,
    time: String,
    classes: [String, Object],
  },
  computed: {
    accountId() {
      return this.$store.state.accountId;
    },
    isTransferred() {
      return this.accountColor &&
        this.accountName &&
        this.desAccountColor &&
        this.desAccountName
        ? true
        : false;
    },
    isOnDetailPage() {
      return this.$store.state.modal.accountDetail;
    },
  },
};
</script>

<style scoped>
.account-dot.outlined {
  @apply h-4 w-4;
  @apply rounded-full;
  @apply border-4 border-dark-100;
}
.account-dot {
  @apply h-2 w-2;
  @apply rounded-full;
}
</style>