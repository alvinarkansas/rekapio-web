import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const authenticate = async (to, from, next) => {
  await store.dispatch("refreshToken");
  if (store.state.token && store.state.authenticated) {
    next();
  } else {
    next({ name: "Login" });
  }
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/app",
    name: "App",
    component: () => import("../layouts/Main.vue"),
    beforeEnter: authenticate,
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
