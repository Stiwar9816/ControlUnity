<template>
  <v-layout>
    <v-flex>
      <v-app>
        <v-content>
          <v-container>
            <nuxt />
            <v-footer :fixed="fixed" app>
              <span>
                &copy; Control Unity 2019 - Created by:
                <a href target="__blank">Stiwar Asprilla</a> &
                <a href target="__blank">Jhon E. Palacios</a>
              </span>
            </v-footer>
          </v-container>
        </v-content>
      </v-app>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  data() {
    return {
      fixed: false
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