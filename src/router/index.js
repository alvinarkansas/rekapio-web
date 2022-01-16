import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const authenticate = async (to, from, next) => {
  if (store.state.token && store.state.authenticated) {
    next();
  } else {
    await store.dispatch("refreshToken");
    if (store.state.token && store.state.authenticated) {
      next();
    } else {
      next({ name: "Login" });
    }
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
    redirect: "/app/home",
    name: "App",
    component: () => import("../layouts/Main.vue"),
    beforeEnter: authenticate,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "budget",
        name: "Budget",
        component: () => import("../views/Budget.vue"),
      },
      {
        path: "stats",
        name: "Stats",
        component: () => import("../views/Stats.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
