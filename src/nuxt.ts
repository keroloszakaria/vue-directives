import { addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";
import type { VueDirectivesPluginOptions } from "./plugin";

export interface ModuleOptions extends VueDirectivesPluginOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "vue-directives",
    configKey: "vueDirectives",
    compatibility: {
      nuxt: ">=3.0.0",
    },
  },
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);

    addPlugin({
      src: resolver.resolve("./runtime/plugin"),
      mode: "client",
    });
  },
});
