<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="appbar"
      fixed
      app
    >
      <v-list-item>
        <v-img
          v-if="miniVariant === false"
          src="/logo.png"
          class="logo"
          alt="Logo-uniclaretiana"
        ></v-img>
        <v-img
          v-else
          src="/logo-principal.png"
          alt="logo-uniclaretiana"
        ></v-img>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          aria-label="main menu"
        >
          <v-list-item-action>
            <v-icon text color="accent">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-1" align="center">
          <!-- <v-btn rounded text color="accent" to="/configuraciones" aria-label="Action menu">
            <v-icon dark>fa fa-wrench</v-icon>
          </v-btn> -->
          <v-btn rounded text color="error" to="/" aria-label="Action menu">
            <v-icon dark>mdi-power</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="appbar" fixed app flat>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        aria-label="Action menu"
      >
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-app-bar-nav-icon>
      <v-btn
        aria-label="Action navigation"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `menu-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      title: 'CONTROL UNITY',
      items: [
        {
          icon: 'mdi-home',
          title: 'Inicio',
          to: '/home'
        },
        {
          icon: 'mdi-account-tie',
          title: 'Profesores',
          to: '/profesores'
        },
        {
          icon: 'mdi-google-classroom',
          title: 'Salones',
          to: '/salones'
        },
        {
          icon: 'mdi-archive',
          title: 'Implementos',
          to: '/implementos'
        },
        {
          icon: 'mdi-calendar-month',
          title: 'Reservar',
          to: '/reservar'
        },
        {
          icon: 'mdi-account-group',
          title: 'Usuarios',
          to: '/usuarios'
        }
      ]
    }
  }
}
</script>

<style scoped>
a,
span {
  text-decoration: none;
  color: black;
}
</style>
