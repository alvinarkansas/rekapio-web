<template>
  <BaseBanner @proceed="install" @dismiss="dismiss" v-model="deferredPrompt">
    <p class="text-sm mb-2 text-neutral-100">
      Get better experience with app instead of browser. It won't take up space
      on your phone
    </p>
  </BaseBanner>

  <div class="bg-dark-300 text-neutral-100">
    <div class="py-4 mb-14">
      <router-view />
    </div>
    <TheNavbar />
  </div>
</template>

<script>
import BaseBanner from "../components/BaseBanner.vue";
import TheNavbar from "../components/TheNavbar.vue";

export default {
  name: "Main",
  components: { TheNavbar, BaseBanner },
  data() {
    return {
      deferredPrompt: null,
    };
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
  async mounted() {
    await this.$store.dispatch("loadCategories");
  },
};
</script>
