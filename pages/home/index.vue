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
          <template slot="[name]" slot-scope="data">{{data.item.name}}</template>
          <template slot="[capacity]" slot-scope="data">{{data.item.capacity}}</template>
          <template slot="[description]" slot-scope="data">{{data.item.description}}</template>
          <template v-slot:item.icon="{ item }">
            <v-icon color="green" small>icon-check-square-o</v-icon>
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