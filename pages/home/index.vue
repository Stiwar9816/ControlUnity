<template>
  <v-layout>
    <v-flex>
      <v-container>
        <!-- Tabla devoluciones -->
        <v-row cols="12">
          <v-col md="4">
            <v-subheader class="subtitle-1">DEVOLUCIONES PENDIENTES</v-subheader>
            <v-text-field
              prepend-icon="icon-search"
              v-model="search"
              class="mt-4 mb-5"
              label="Buscar"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.icon="{ item }">
            <v-icon color="green" small>icon-check-square-o</v-icon>
          </template>
        </v-data-table>
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
        { text: "NOMBRE SALON", align: "center" },
        { text: "CAPACIDAD", align: "center", sortable: false },
        { text: "DESCRIPCIÓN", align: "center", sortable: false },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: [{}]
    };
  }
};
</script>