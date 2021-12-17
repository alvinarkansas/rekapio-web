<template>
  <div class="bg-primary text-white min-h-screen">
    <img
      src="../assets/logo.png"
      alt="logo"
      width="128"
      class="p-4 mx-auto mb-12"
    />
    <h1 class="text-2xl font-bold px-4 mb-4">Join us now</h1>
    <form class="px-4">
      <div class="flex flex-col gap-1 mb-4">
        <label htmlFor="name" class="text-sm font-medium"> Name </label>
        <input
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
        <label htmlFor="email" class="text-sm font-medium"> Email </label>
        <input
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
        <label htmlFor="password" class="text-sm font-medium"> Password </label>
        <input
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
          Sign up
        </button>
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
export default {
  name: "Register",
};
</script>

<style>
</style>