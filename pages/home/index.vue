<template>
  <v-layout>
    <v-flex>
      <v-container>
        <!-- Tabla devoluciones -->
        <v-row cols="12">
          <v-col md="4">
            <v-subheader class="subtitle-1">DEVOLUCIONES PENDIENTES</v-subheader>
            <v-text-field
              prepend-icon="fa fa-search"
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
          :items-per-page="10"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:items/>
          <template slot="item.icon" slot-scope="data">
            <v-btn icon aria-label="check" v-on:click="deleteBooking(data.item._id)">
              <v-icon small color="green" small>fa fa-check-square-o</v-icon>
            </v-btn>
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
        { text: "RESPONSABLE", align: "center", value: "name", sortable: false },
        { text: "NOMBRE SALON", align: "center", value: "room", sortable: false },
        {
          text: "MATERIA O EVENTO",
          align: "center",
          sortable: false,
          value: "event"
        },
        {
          text: "FECHA DE LA RESERVA",
          align: "center",
          sortable: false,
          value: "date"
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: []
    };
  },
  async created() {
    try {
      const token = sessionStorage.getItem('token')
      const res = await axios.get(`/api/booking/?token=${token}`);
      this.items = await res.data.Bookings;
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
    //Delete Salon
    deleteBooking(id) {
      const token = sessionStorage.getItem('token')
      const response = confirm("Ya fueron devueltos los implementos prestados?");
      if (response) {
        axios
          .delete(`api/deleteBooking/${id}/${token}`)
          .then(res => {
            const index = this.items.findIndex(
              item => item._id === res.data._id
            );
            this.$router.go();
            this.items.splice(index, 1);
            console.log("Booking Delete: ", id);
          })
          .catch(e => {
            console.log("Unable to clear the booking", e);
          });
      }
      return;
    }
  }
  
};
</script>