<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">CREAR RESERVA</v-subheader>
      <v-container>
        <v-form ref="form" v-on:submit.prevent="newBooking()" v-model="valid" lazy-validation>
          <v-row>
            <!-- inputs -->
            <v-col sm="4" md="2">
              <v-text-field
                v-model="cc"
                :rules="ccRules"
                label="C.C"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="5">
              <v-text-field v-model="name" :rules="nameRules" label="Nombre" required></v-text-field>
            </v-col>
            <v-col sm="4" md="5">
              <v-text-field v-model="event" :rules="eventRules" label="Materia o evento" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="6" md="2">
              <v-text-field
                v-model="capacity"
                :rules="capacitySalonRules"
                label="Capacidad salon"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="6" md="2">
              <v-autocomplete
                v-model="room"
                :rules="[v => !!v || 'Nombre del salon es requerido']"
                label="Salon"
                :items="salons"
                item-text="name"
                item-value="name"
                flat
                chips
                small-chips
                deletable-chips
                hide-selected
                hide-details
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>No existe coincidencias</v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <!--DatePicker  -->
            <v-col sm="6" md="2">
              <v-menu
                v-model="DateModal"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    :rules="dateRules"
                    label="Fecha de reserva"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="DateModal = false"
                  locale="es-co"
                  first-day-of-week="1"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!-- End DatePicker -->
            <!-- TimePicker -->
            <v-col sm="6" md="2">
              <v-dialog
                ref="dialog"
                v-model="TimeModal"
                :return-value.sync="time"
                transition="scale-transition"
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="time" :rules="timeRules" label="Hora de reserva" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="TimeModal" v-model="time" ampm-in-title format="ampm">
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="$refs.dialog.save(time)">Aceptar</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <!-- End TimePicker -->
            <!-- Implementos -->
            <v-col sm="6" md="4">
              <v-combobox
                v-model="implement"
                :items="implements"
                item-text="name "
                item-value="name"
                label="Implementos"
                placeholder="Eliga los implementos necesarios"
                chips
                small-chips
                deletable-chips
                multiple
                hide-selected
                hide-details
                clearable
                flat
                rounded
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>No hay información registrada</v-list-item-title>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <!-- End implementos -->
          </v-row>
          <!-- boton reservar -->
          <v-row justify="center">
            <v-btn
              rounded
              color="primary black--text"
              type="submit"
              :disabled="!valid"
              @click="validate"
              aria-label="New booking"
              class="mt-5"
            >
              <v-icon dark>fa fa-plus</v-icon>Agregar
            </v-btn>
          </v-row>
          <!-- End Boton reservar -->
        </v-form>
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
      time: "",
      date: "",
      cc: "",
      name: "",
      event: "",
      capacity: "",
      room: "",
      implement: "",
      TimeModal: false,
      DateModal: false,
      valid: true,
      ccRules: [v => !!v || "Cedula de ciudadania del usuario es requerida"],
      nameRules: [v => !!v || "Nombre del usuario es requerido"],
      eventRules: [v => !!v || "Nombre de la materia o evento es requerido"],
      capacitySalonRules: [v => !!v || "Capacidad del salon es requerido"],
      dateRules: [v => !!v || "Fecha de la reserva es requerida"],
      timeRules: [v => !!v || "Hora de la reserva es requerida"],
      headers: [
        { text: "SERIAL", align: "center", sortable: false },
        { text: "IMPLEMENTO", align: "center" },
        { text: "STOCK", align: "center", sortable: false },
        { text: "MARCA", align: "center" },
        { text: "ACCIONES", align: "center", sortable: false }
      ],
      salons: [],
      implements: [],
      bookings:[]
    };
  },
  created() {
    this.getSalon();
    this.getImplements();
  },
  mounted() {
    this.valid = false;
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    getSalon() {
      axios
        .get("room")
        .then(res => {
          this.salons = res.data.Rooms;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImplements() {
      axios
        .get("implement")
        .then(res => {
          this.implements = res.data.implement;
        })
        .catch(error => {
          console.log(error);
        });
    },
    newBooking(){
      axios.post("newBooking", {cc: this.cc ,name: this.name, event: this.event, capacity: this.capacity, room: this.room, date:this.date, time:this.time, implement: this.implement})
      .then(res=>{
        this.bookings = res.data.bookings
      })
      .catch(e =>{
        console.log(e);
      })
    }
  }
};
</script>