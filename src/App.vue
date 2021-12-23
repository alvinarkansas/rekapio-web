<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  computed: {
    modal() {
      return this.$store.state.modal;
    },
  },
  watch: {
    modal: {
      deep: true,
      handler() {
        let modalOpened = Object.values(this.modal).includes(true);
        if (modalOpened) {
          document.querySelector("body").style.overflowY = "hidden";
        } else {
          document.querySelector("body").style.overflowY = "auto";
        }
      },
    },
  },
};
</script>
