<template>
  <div
    className="h-screen text-warning-200 font-semibold grid place-items-center"
  >
    Coming soon 🚀
    <button @click="logout" class="bg-primary text-white p-4 rounded-lg">
      Sign Out
    </button>
  </div>
</template>

<script>
import { API } from "../api";

export default {
  name: "Profile",
  methods: {
    async logout() {
      try {
        await API.post("/users/revoke_refresh_token");
        this.$store.commit("SET_TOKEN", "");
        this.$store.commit("SET_AUTHENTICATED", false);
        this.$router.push("/");
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>
