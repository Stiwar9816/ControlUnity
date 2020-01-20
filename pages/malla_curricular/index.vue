<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-subheader class="subtitle-1">MALLA CURRICULAR</v-subheader> <br />

        <!-- v-tabs title-->
        <v-tabs grow show-arrows>
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab>
            Ingenieria de sistemas
          </v-tab>
          <v-tab>
            Ingenieria industrial
          </v-tab>
          <v-tab>
            Psicología
          </v-tab>
          <v-tab>
            Antropología
          </v-tab>
          <v-tab>
            Trabajo social
          </v-tab>
          <v-tab>
            Derecho
          </v-tab>
          <v-tab>
            Administración de empresas
          </v-tab>
          <!-- Contenido de las tabs -->
          <v-tab-item>
            <br />
            <br />
            <inputMalla />
          </v-tab-item>
          <v-tab-item>
            <br />
            <br />
            <inputMalla />
          </v-tab-item>
          <v-tab-item>
            <br />
            <br />
            <inputMalla />
          </v-tab-item>
          <v-tab-item>
            <br />
            <br />
            <inputMalla />
          </v-tab-item>
          <v-tab-item>
            <br />
            <br />
            <inputMalla />
          </v-tab-item>
          <v-tab-item>
            <br />
            <br />
            <inputMalla />
          </v-tab-item>
          <v-tab-item>
            <br />
            <br />
            <inputMalla />
          </v-tab-item>
        </v-tabs>
        <!-- end -->
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import inputMalla from "~/components/AddMalla";
export default {
  layout: "home",
  components: {
    inputMalla
  }
};
</script>
