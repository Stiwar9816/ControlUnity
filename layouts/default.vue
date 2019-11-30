<template>
  <v-layout>
    <v-flex>
      <v-app>
        <v-content>
          <v-container>
            <nuxt />
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