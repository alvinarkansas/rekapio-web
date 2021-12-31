<template>
  <transition name="fade" appear>
    <div
      v-if="modelValue"
      class="w-screen h-screen bg-black bg-opacity-75 fixed inset-0 z-50"
      @click="overlayClick"
    />
  </transition>
  <transition name="mobile-slide-up" appear>
    <div
      v-if="modelValue"
      class="
        fixed
        modal-style
        rounded-t-2xl
        shadow-custom
        z-50
        transition-colors
        duration-500
        transform
      "
      :class="[
        violated ? 'bg-flame-soft' : 'bg-dark-300',
        fixedInner ? 'inset-0' : 'bottom-0 inset-x-0',
      ]"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    fixedInner: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      violated: false,
    };
  },
  methods: {
    overlayClick() {
      if (!this.permanent) {
        this.$emit("update:modelValue", false);
      } else {
        this.violated = true;
        setTimeout(() => {
          this.violated = false;
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
.shadow-custom {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
}

.slide-up-enter-active,
.slide-up-leave-active,
.mobile-slide-up-enter-active,
.mobile-slide-up-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  top: 100vh !important;
  transform: translateY(100vh) !important;
  transform: translateX(-50%) !important;
}

.mobile-slide-up-enter-from,
.mobile-slide-up-leave-to {
  transform: translateY(100vh) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-style .inner-modal-fixed {
  height: 85vh;
}
.modal-style .inner-modal-auto {
  height: auto;
}
</style>
