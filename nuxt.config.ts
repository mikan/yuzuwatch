// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: "",
      imgUrl: "",
    },
  },

  modules: ["@nuxt/content", "nuxt-icon"],
  compatibilityDate: "2024-12-18",
});
