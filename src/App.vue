<template>
  <BaseBanner @proceed="install" @dismiss="dismiss" v-model="deferredPrompt">
    <p class="text-sm mb-2 text-neutral-100">
      Get better experience with app instead of browser. It won't take up space
      on your phone
    </p>
  </BaseBanner>
  <router-view />
</template>

<script>
import BaseBanner from "./components/BaseBanner.vue";

export default {
  name: "App",
  components: {
    BaseBanner,
  },
  data() {
    return {
      deferredPrompt: null,
    };
  },
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
  methods: {
    async dismiss() {
      console.log("dismissed");
      this.deferredPrompt = null;
    },
    async install() {
      console.log("prompted");
      this.deferredPrompt.prompt();
    },
  },
  created() {
    setTimeout(() => {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });
      window.addEventListener("appinstalled", () => {
        this.deferredPrompt = null;
      });
    }, 3000);
  },
};
</script>
