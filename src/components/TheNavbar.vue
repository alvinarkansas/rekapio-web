<template>
  <nav
    className="fixed bottom-0 w-screen flex justify-between text-neutral-300 px-4 py-2 text-xs font-medium bg-dark-100"
  >
    <BaseNavItem to="/app/home" label="Home" icon="home" />
    <BaseNavItem to="/app/budget" label="Budget" icon="thumbtack" />
    <button
      @click="$store.commit('SET_MODAL', { type: 'recordAdd', payload: true })"
      className="grid place-items-center rounded-full bg-shades-400 w-10 h-10"
    >
      <BaseIcon name="plus" color="white" />
    </button>
    <BaseNavItem to="/app/stats" label="Stats" icon="chart-pie-alt" />
    <BaseNavItem to="/app/profile" label="Profile" icon="user" />
  </nav>
</template>

<script>
import BaseNavItem from "./BaseNavItem.vue";
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "TheNavbar",
  components: { BaseNavItem, BaseIcon },
};
</script>
