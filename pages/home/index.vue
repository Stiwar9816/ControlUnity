<template>
  <v-layout>
    <v-flex>
      <v-container>
        <!-- Tabla reservas por confirmar-->
        <v-row cols="12">
          <v-col md="4">
            <v-subheader class="subtitle-1">RESERVAS POR CONFIRMAR</v-subheader>
            <v-text-field v-model="searchR" class="mt-4 mb-5" label="Buscar" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-data-table :headers="headers" :search="searchR"></v-data-table>
        <!-- Tabla devoluciones -->
        <v-row cols="12">
          <v-col md="4">
            <v-subheader class="subtitle-1">DEVOLUCIONES PENDIENTES</v-subheader>
            <v-text-field v-model="searchD" class="mt-4 mb-5" label="Buscar" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-data-table :headers="headers" :search="searchD"></v-data-table>
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
        { text: "NOMBRE SALON", align: "center" },
        { text: "CAPACIDAD", align: "center", sortable: false },
        { text: "DESCRIPCIÓN", align: "center", sortable: false },
        { text: "ACCIONES", align: "center", sortable: false }
      ]
    };
  }
};
</script>