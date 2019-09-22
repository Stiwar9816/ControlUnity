<template>
  <v-layout>
    <v-flex>
      <h3 class="title mt-3">CONTROL DE RESERVAS</h3>
      <v-container>
        <!-- Tabla reservas por confirmar-->
        <v-row cols="12">
          <v-col md="4">
            <p class="mt-5">Reservas por confirmar</p>
            <v-text-field v-model="searchR" class="mt-4 mb-5" label="Buscar" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-data-table :headers="headers" :search="search"></v-data-table>
        <!-- Tabla devoluciones -->
        <v-row cols="12">
          <v-col md="4">
            <p class="mt-5">Devoluciones pendientes</p>
            <v-text-field v-model="searchD" class="mt-4 mb-5" label="Buscar" hide-details></v-text-field>
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
      searchR: "",
      searchD: "",
      headers: [
        { text: "#", align: "center", sortable: false },
        { text: "NOMBRE SALON", align: "center" },
        { text: "CAPACIDAD", align: "center", sortable: false },
        { text: "DESCRIPCION", align: "center", sortable: false },
        { text: "ACCIONES", align: "center", sortable: false }
      ]
    };
  }
};
</script>