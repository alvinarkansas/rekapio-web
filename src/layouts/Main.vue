<template>
  <div class="bg-dark-300 text-neutral-100">
    <div class="py-4 mb-14">
      <router-view />
    </div>
    <TheNavbar />
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue";

export default {
  name: "Main",
  components: { TheNavbar },
  async mounted() {
    await this.$store.dispatch("loadCategories");
  },
};
</script>
