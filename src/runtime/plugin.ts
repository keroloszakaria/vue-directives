import { defineNuxtPlugin } from "#app";
import { VueDirectivesPlugin } from "../plugin";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDirectivesPlugin);
});
