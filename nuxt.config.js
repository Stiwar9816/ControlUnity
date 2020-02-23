const colors = require("vuetify/es5/util/colors").default;
module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Control Unity | Sistema de gestión de aulas e implementos",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Montserrat&display=auto"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@assets/css/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/datetime.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/font-awesome"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.amber.accent3,
          secondary: colors.grey.lighten1,
          accent: colors.grey.darken2,
          info: colors.grey.darken4,
          footer: colors.grey.lighten5,
          appbar: colors.grey.lighten3,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          edit: colors.lightBlue.darken3
        }
      }
    }
  },
  serverMiddleware: [
    // Will register redirect-ssl npm package
    "redirect-ssl",
    // Will register file from project api directory to handle /api/* requires
    "~/api/index.js"
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ["datetime"]
  }
};
