<template>
  <div class="bg-primary text-white min-h-screen">
    <img
      src="../assets/logo.png"
      alt="logo"
      width="128"
      class="p-4 mx-auto mb-12"
    />
    <h1 class="text-2xl font-bold px-4 mb-4">Get started</h1>
    <form @submit.prevent="register" class="px-4">
      <div class="flex flex-col gap-1 mb-4">
        <label for="name" class="text-sm font-medium">Name</label>
        <input
          v-model="name"
          type="name"
          name="name"
          spellcheck="false"
          placeholder="Type your name here"
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

      <div class="flex flex-col gap-1 mb-4">
        <label for="email" class="text-sm font-medium">Email</label>
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
        <label for="password" class="text-sm font-medium">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          spellcheck="false"
          placeholder="Set a password for later"
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
        <BaseButton
          type="submit"
          flavor="warning"
          label="Sign up"
          loading-label="Please wait"
          size="md"
          class="w-full py-2 bg-warning-300"
          :loading="loading"
        />
        <p>
          or sign in
          <router-link
            to="/"
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
import BaseButton from "../components/BaseButton.vue";
import { useToast } from "vue-toastification";

export default {
  name: "Register",
  components: { BaseButton },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async register() {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try {
        this.loading = true;
        const { data } = await AUTH_API.post("/signup", payload);
        this.$router.replace("/app");
        this.$store.commit("SET_TOKEN", data.access_token);
        this.$store.commit("SET_AUTHENTICATED", true);
      } catch (error) {
        if (error.response?.data?.message.length) {
          for (let msg of error.response?.data?.message) {
            this.toast.error(msg);
          }
        } else {
          this.toast.error(error.response.data);
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>