import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'Control Unity | Sistema de gestión de aulas e implementos',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/datetime.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/pwa'],

  pwa: {
    manifest: {
      name: 'Control Unity',
      lang: 'es'
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
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
    customVariables: ['~/assets/variables.scss'],
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
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ['datetime']
  }
}
