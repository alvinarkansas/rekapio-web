import { createApp } from "vue";
import Maska from "maska";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";

createApp(App)
  .use(router)
  .use(store)
  .use(Maska)
  .mount("#app");
