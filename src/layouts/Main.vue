<template>
  <div>Lorem, ipsum.</div>
  <button @click="logout" class="bg-primary p-4 rounded-lg">Sign Out</button>
  <div>
    <router-view />
  </div>
</template>

<script>
import { API } from "../api";
export default {
  name: "Main",
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

<style></style>
