<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">CREAR RESERVA</v-subheader>

      <v-container>
        <v-form
          ref="form"
          v-on:submit="newBooking()"
          v-model="valid"
          lazy-validation
        >
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
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nombre de la persona responsable"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="5">
              <v-text-field
                v-model="event"
                :rules="eventRules"
                label="Materia o evento"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="6" md="2">
              <v-select
                v-model="room"
                label="Capacidad salon"
                :items="salons"
                item-text="capacity"
                item-value="name"
                flat
                chips
                small-chips
                readonly
              ></v-select>
            </v-col>
            <v-col sm="6" md="2">
              <v-autocomplete
                v-model="room"
                :rules="[v => !!v || 'Nombre del salon es requerido']"
                label="Eliga un salon"
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
                    <v-list-item-title
                      >No existe coincidencias</v-list-item-title
                    >
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <!-- DatePicker -->
            <v-col sm="4" md="3">
              <v-dialog
                ref="dialog"
                v-model="DateModal"
                :return-value.sync="date"
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Fecha de reserva"
                    v-on="on"
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  scrollable
                  min="2019-12-02"
                  locale="es"
                  first-day-of-week="1"
                  multiple
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="DateModal = false"
                    >Cancelar</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.dialog.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
            </v-col>
            <!-- End DatePicker -->
            <!-- Implementos -->
            <v-col sm="6" md="5">
              <v-combobox
                v-model="implement"
                :items="implements"
                item-text="name"
                item-value="name"
                label="Eliga los implementos necesarios"
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
                    <v-list-item-title
                      >No hay información registrada</v-list-item-title
                    >
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <!-- End implementos -->
            <v-col style="width: 290px; flex: 17 1 auto;">
              <p>Hora de inicio:</p>
              <v-time-picker v-model="start" :max="end"></v-time-picker>
            </v-col>
            <v-col style="width: 290px; flex: 1 1 auto;">
              <p>Hora de finalazación:</p>
              <v-time-picker v-model="end" :min="start"></v-time-picker>
            </v-col>
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
      // time: "",
      date: [],
      cc: "",
      name: "",
      event: "",
      capacity: "",
      room: "",
      implement: "",
      DateModal: false,
      valid: true,
      start: "",
      end: "",
      ccRules: [v => !!v || "Cedula de ciudadania del usuario es requerida"],
      nameRules: [v => !!v || "Nombre del usuario es requerido"],
      eventRules: [v => !!v || "Nombre de la materia o evento es requerido"],
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
      bookings: []
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
        .get("api/room")
        .then(res => {
          this.salons = res.data.Rooms;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImplements() {
      axios
        .get("api/implement")
        .then(res => {
          this.implements = res.data.implement;
        })
        .catch(error => {
          console.log(error);
        });
    },
    newBooking() {
      axios
        .post("api/newBooking", {
          cc: this.cc,
          name: this.name,
          event: this.event,
          room: this.room,
          date: this.date,
          start: this.start,
          end: this.end,
          implement: this.implement
        })
        .then(res => {
          this.bookings = res.data.bookings;
          if (this.end === this.bookings.end) {
            alert("Cruce de horarios")
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
