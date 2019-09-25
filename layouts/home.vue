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
        <v-img src="/logo.png" class="logo" alt="Logo-uniclaretiana"></v-img>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
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
          <v-btn rounded text color="accent" to="/configuraciones">
            <v-icon dark>icon-wrench</v-icon>
          </v-btn>
          <v-btn rounded text color="error" to="/">
            <v-icon dark>icon-power-off</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="appbar" fixed app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" color="appbar" app>
      <span>
        &copy; Control Unity 2019 - Created by:
        <a
          href="https://twitter.com/AsprillaStiwar"
          target="_blank"
        >Stiwar Asprilla</a> &
        <a href="https://twitter.com/_JhonE17" target="_blank">Jhon E. Palacios</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "icon-home",
          title: "Inicio",
          to: "/home"
        },
        {
          icon: "icon-graduation-cap",
          title: "Salones",
          to: "/salones"
        },
        {
          icon: "icon-archive",
          title: "Implementos",
          to: "/implementos"
        },
        {
          icon: "icon-calendar",
          title: "Reservar",
          to: "/reservar"
        },

        {
          icon: "icon-users",
          title: "Usuarios",
          to: "/usuarios"
        }
      ],
      miniVariant: false,
      title: "CONTROL UNITY"
    };
  }
};
</script>


<style scoped>
a,
span {
  text-decoration: none;
  color: black;
}
#logo {
  text-align: left;
}
</style>