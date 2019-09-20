<template>
  <v-layout>
    <v-flex>
      <h3 class="title mt-3">USUARIOS REGISTRADOS</h3>
      <v-container>
        <!-- Tabla -->
        <v-row cols="12">
          <v-col md="4">
            <v-text-field v-model="search" class="mt-4 mb-5" label="Buscar usuarios" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-data-table :headers="headers" :search="search"></v-data-table>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      search: "",
      headers: [
        { text: "CEDULA", align: "center", sortable: false },
        { text: "NOMBRE COMPLETO", align: "center" },
        { text: "CORREO ELECTRONICO", align: "center", sortable: false },
        { text: "ACCIONES", align: "center", sortable: false }
      ]
    };
  }
};
</script>