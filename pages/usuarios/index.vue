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
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template slot="[cc]" slot-scope="data">{{data.item.cc}}</template>
          <template slot="[name]" slot-scope="data">{{data.item.name}}</template>
          <template slot="[email]" slot-scope="data">{{data.item.email}}</template>
          <template v-slot:item.icon="{ item }">
            <v-btn icon>
              <v-icon color="error" small>icon-trash</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-results>
            <span>No se encontraron coincidencias</span>
          </template>
          <template v-slot:no-data>
            <span>No hay información registrada</span>
          </template>
        </v-data-table>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "~/plugins/axios";
export default {
  layout: "home",
  data() {
    return {
      search: "",
      headers: [
        { text: "CEDULA", align: "center", sortable: false, value: "cc" },
        { text: "NOMBRE COMPLETO", align: "center", value: "name" },
        {
          text: "CORREO ELECTRONICO",
          align: "center",
          sortable: false,
          value: "email"
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: []
    };
  },
  async created() {
    try {
      const res = await axios.get("user");
      this.items = await res.data.users;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>