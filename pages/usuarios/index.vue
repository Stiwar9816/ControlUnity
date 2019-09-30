<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">USUARIOS REGISTRADOS</v-subheader>
      <v-container>
        <!-- Tabla -->
        <v-row cols="12">
          <v-col md="4">
            <v-text-field
              prepend-icon="icon-search"
              v-model="search"
              class="mt-4 mb-5"
              label="Buscar usuarios"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.icon="{ item }">
            <v-icon color="error" small>icon-trash</v-icon>
          </template>
        </v-data-table>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios';
export default {
  layout: "home",
  data() {
    return {
      search: "",
      headers: [
        { text: "CEDULA", align: "center", sortable: false },
        { text: "NOMBRE COMPLETO", align: "center" },
        { text: "CORREO ELECTRONICO", align: "center", sortable: false },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: []
    };
  },
  async created(){
    try {
      const res = await axios.get("/api/user");
      console.log("usuarios:",res.data);
      this.items = res.data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>