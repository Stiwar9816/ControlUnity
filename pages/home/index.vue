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
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template slot="items" slot-scope="data"/>
          <template v-slot:item.icon>
            <v-icon color="green" small>icon-check-square-o</v-icon>
          </template>
          <template v-slot:no-results>
            <span class="font-weight-regular black--text">No se encontraron coincidencias</span>
          </template>
          <template v-slot:no-data>
            <span class="font-weight-regular black--text">No hay información registrada</span>
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
        { text: "NOMBRE SALON", align: "center", value: "name" },
        {
          text: "CAPACIDAD",
          align: "center",
          sortable: false,
          value: "capacity"
        },
        {
          text: "DESCRIPCIÓN",
          align: "center",
          sortable: false,
          value: "description"
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: []
    };
  },
  async created() {
    try {
      const res = await axios.get("booking");
      this.items = await res.data.Bookings;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>