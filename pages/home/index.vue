<template>
  <v-layout>
    <v-flex>
      <v-container>
        <!-- Tabla devoluciones -->
        <v-row cols="12">
          <v-col md="4" sm="6">
            <v-subheader class="subtitle-1">DEVOLUCIONES PENDIENTES</v-subheader>
            <v-text-field prepend-icon="fa fa-search" v-model="search" class="mt-4 mb-5" label="Buscar" hide-details></v-text-field>
          </v-col>
        </v-row>

        <v-data-table :headers="headers" :items="items" :items-per-page="10" :search="search" class="elevation-1">
          <template v-slot:items />
          <template slot="item.icon" slot-scope="data">
            <v-btn icon aria-label="check" v-on:click="deleteBooking(data.item._id)">
              <v-icon small color="green">fa fa-check-square-o</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-results>
            <span class="font-weight-regular black--text">No se encontraron coincidencias</span>
          </template>
          <template v-slot:no-data>
            <span class="font-weight-regular black--text">No hay información registrada</span>
          </template>
        </v-data-table>
        <!-- Alerta -->
        <v-snackbar v-model="snackbar" :color="color">
          {{ text }}
        </v-snackbar>
        <!-- End Alerta -->
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
      snackbar: false,
      text: "",
      color: "",
      timeout: 3000,
      headers: [
        {
          text: "RESPONSABLE",
          align: "center",
          value: "name",
          sortable: false
        },
        {
          text: "CC",
          align: "center",
          value: "cc",
          sortable: false
        },
        {
          text: "NOMBRE SALON",
          align: "center",
          value: "room",
          sortable: true
        },
        {
          text: "MATERIA O EVENTO",
          align: "center",
          sortable: false,
          value: "event"
        },
        {
          text: "FECHA INICIO RESERVA",
          align: "center",
          sortable: true,
          value: "schedules[0].start"
        },
        {
          text: "FECHA FINAL RESERVA",
          align: "center",
          sortable: false,
          value: "schedules[0].end"
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: []
    };
  },
  async created() {
    try {
      const res = await axios.get(`/api/booking`);
      this.items = await this.mapBookings(res.data.Bookings);
    } catch (error) {
      this.snackbar = true;
      this.color = "error";
      this.text = error.message;
    }
  },
  methods: {
    mapBookings(items) {
      for (let item of items) {
        const haveSchedules = item.schedules && item.schedules.length;
        if (haveSchedules) {
          item.schedules = item.schedules.map(schedule => {
            schedule.start = new Date(schedule.start).toLocaleString("es-CO", { timeZone: "America/Bogota" });
            schedule.end = new Date(schedule.end).toLocaleString("es-CO", { timeZone: "America/Bogota" });
            return schedule;
          });
        }
      }
      return items;
    },
    //Delete Salon
    deleteBooking(id) {
      const response = confirm("Ya fueron devueltos los implementos prestados?");
      if (response) {
        axios
          .delete(`api/deleteBooking/${id}`)
          .then(res => {
            const index = this.items.findIndex(item => item._id === res.data._id);
            this.items.splice(index, 1);
            this.snackbar = true;
            this.color = "success";
            this.text = "¡Elementos devueltos con exito!";
            this.$router.go();
          })
          .catch(e => {
            this.snackbar = true;
            this.color = "error";
            this.text = e.response.data.message;
          });
      }
      return;
    }
  }
};
</script>
