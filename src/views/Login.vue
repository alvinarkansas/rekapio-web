<template>
  <div class="bg-primary text-white h-screen overflow-hidden">
    <img
      src="../assets/logo.png"
      alt="logo"
      width="128"
      class="p-4 mx-auto mb-12"
    />
    <h1 class="text-2xl font-bold px-4 mb-4">Sign in to continue</h1>
    <form @submit.prevent="login" class="px-4">
      <div class="flex flex-col gap-1 mb-4">
        <label for="email" class="text-sm font-medium"> Email </label>
        <input
          v-model="email"
          type="email"
          name="email"
          spellcheck="false"
          placeholder="Type your email here"
          class="
            px-3
            py-2
            rounded-md
            text-neutral-500
            focus:outline-none
            focus:ring-2
            focus:ring-shades-200
            focus:ring-offset-2
            focus:ring-offset-primary
          "
        />
      </div>

      <div class="flex flex-col gap-1 mb-6">
        <label for="password" class="text-sm font-medium"> Password </label>
        <input
          v-model="password"
          type="password"
          name="password"
          spellcheck="false"
          placeholder="We also need your password"
          class="
            px-3
            py-2
            rounded-md
            text-neutral-500
            focus:outline-none
            focus:ring-2
            focus:ring-shades-200
            focus:ring-offset-2
            focus:ring-offset-primary
          "
        />
      </div>

      <div class="flex flex-col gap-4 items-end">
        <button
          class="
            px-3
            py-2
            bg-warning-300
            w-full
            rounded-md
            font-medium
            focus:outline-none
            focus:ring-2
            focus:ring-warning-300
            focus:ring-offset-2
            focus:ring-offset-primary
          "
        >
          Sign in
        </button>
        <p>
          or sign up
          <router-link
            to="/register"
            class="text-warning-200 focus:outline-none focus:text-warning-400"
          >
            here
          </router-link>
        </p>
      </div>
    </form>
    <img class="mt-12 ml-auto" src="../assets/deco.svg" alt="deco" />
  </div>
</template>

<script>
import { AUTH_API } from "../api";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const { data } = await AUTH_API.post("/signin", payload);
        this.$router.push("/app");
        this.$store.commit("SET_TOKEN", data.access_token);
        this.$store.commit("SET_AUTHENTICATED", true);
      } catch (error) {
        console.log("🦊", error.response);
      }
    },
  },
};
</script>