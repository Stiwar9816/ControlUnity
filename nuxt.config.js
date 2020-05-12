export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'Control Unity | Sistema de gestión de aulas e implementos',
    title: 'Control Unity',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://control-unity-api.herokuapp.com' },
      {
        rel: 'preconnect',
        href:
          'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
      },
      {
        rel: 'preconnect',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#EEEEEE' },
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
      name: 'Control Unity | Sistema de gestión de aulas e implementos',
      short_name: 'Control Unity',
      background_color: '#EEEEEE',
      theme_color: '#EEEEEE',
      start_url: '/',
      lang: 'es',
      display: 'minimal-ui'
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
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
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#FFC400',
          secondary: '#BDBDBD',
          accent: '#616161',
          info: '#212121',
          footer: '#FAFAFA',
          appbar: '#EEEEEE',
          warning: '#FFC107',
          error: '#DD2C00',
          success: '#00E676',
          edit: '#0277BD'
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
