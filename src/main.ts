import { createApp } from "vue";
import App from "./App.vue";
import { store, storeKey } from "./store";
import installAxios from "./plugins/axios";

createApp(App)
  .use(store, storeKey)
  .use(installAxios)
  .mount("#app");
