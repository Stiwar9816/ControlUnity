<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">CREAR RESERVA</v-subheader>
      <v-container>
        <!-- Formulario de reservas -->
        <v-form ref="form" v-on:submit.prevent="newBooking()" v-model="valid" v-if="!edit" lazy-validation>
          <v-row>
            <!-- inputs -->
            <v-col sm="4" md="2">
              <v-text-field v-model="cc" :rules="ccRules" autofocus label="C.C" type="number" min="0" required></v-text-field>
            </v-col>
            <v-col sm="4" md="5">
              <v-text-field v-model="name" :rules="nameRules" type="text" pattern="[A-Za-z\s]" maxlength="45" label="Nombre de la persona responsable" required></v-text-field>
            </v-col>
            <v-col sm="4" md="5">
              <v-text-field v-model="event" :rules="eventRules" label="Materia o evento" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="6" md="2">
              <v-select v-model="room" label="Capacidad salon" :items="salons" item-text="capacity" item-value="name" flat chips small-chips readonly></v-select>
            </v-col>
            <v-col sm="6" md="2">
              <v-autocomplete v-model="room" :rules="[v => !!v || 'Nombre del salon es requerido']" label="Eliga un salon" :items="salons" item-text="name" item-value="name" flat chips small-chips deletable-chips hide-selected hide-details>
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>No existe coincidencias</v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <!-- DateT(imePicker Start) -->
            <v-col sm="6" md="2">
              <v-datetime-picker label="Fecha y hora de inicio" v-model="schedules.start" required clearText="Cancelar" okText="Confirmar"> </v-datetime-picker>
            </v-col>
            <!-- End DateTimePicker Start -->

            <!-- DateTimePickerEnd -->
            <v-col sm="6" md="2">
              <v-datetime-picker label="Fecha y hora final" v-model="schedules.end" required clearText="Cancelar" okText="Confirmar"> </v-datetime-picker>
            </v-col>
            <!-- End DateTimePickerEnd -->

            <!-- Implementos -->
            <v-col sm="6" md="4">
              <v-combobox v-model="implement" :items="implements" item-text="name" item-value="name" label="Eliga los implementos necesarios" chips small-chips deletable-chips multiple hide-selected hide-details clearable flat rounded>
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
            <v-btn class="mb-4 mr-4" rounded color="error black--text" id="btn-reservar" @click="edit = true"
              ><v-icon dark class="mr-1">fa fa-ban</v-icon>
              Cancelar
            </v-btn>
            <v-btn rounded color="primary black--text" type="submit" :disabled="!valid" aria-label="New booking" class="mb-4"> <v-icon dark class="mr-1">fa fa-plus</v-icon>Agregar </v-btn>
          </v-row>

          <!-- End Boton reservar -->
        </v-form>
        <!-- End Formulario de reservas -->

        <!-- cards de salones -->
        <v-form ref="form" v-if="edit" lazy-validation>
          <v-row>
            <v-col>
              <v-item-group>
                <v-container>
                  <v-row>
                    <v-col v-for="(item, i) in salons" :key="i" cols="12" md="3" sm="4">
                      <v-item>
                        <v-card class="mx-auto" max-width="300">
                          <v-card-text>
                            <p class="display-1 text--primary text-center mt-3">
                              {{ item.name }}
                            </p>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn text block class="mb-3" id="btn-reservar" @click="edit = false">
                              Reservar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-col>
          </v-row>
        </v-form>
        <!-- end cards de salones -->

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
import { token } from "morgan";
export default {
  layout: "home",
  data() {
    return {
      search: "",
      edit: true,
      cc: "",
      name: "",
      event: "",
      capacity: "",
      room: "",
      implement: "",
      valid: true,
      schedules: { start: "", end: "" },
      snackbar: false,
      text: "",
      color: "",
      //Validaciones de campos
      ccRules: [v => !!v || "Cedula de ciudadania del usuario es requerida"],
      nameRules: [v => !!v || "Nombre del usuario es requerido", v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"],
      eventRules: [v => !!v || "Nombre de la materia o evento es requerido", v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"],
      dateRules: [v => !!v || "Fecha de la reserva es requerida"],
      timeRules: [v => !!v || "Hora de la reserva es requerida"],
      // Headers de la tabla
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
    // try {
    // this.newBooking();
      
    // } catch (error) {
    //   console.log({error})
    // }
  },
  methods: {
    // mapStringToDate(date, time = "") {
    //   const result = date;
    //   const [hour, minute] = time.split(":");
    //   console.log({ time, hour, minute });
    //   result.setHours(Number(hour));
    //   result.setMinutes(Number(minute));
    //   return result;
    // },
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
          this.snackbar = true;
          this.color = "error";
          this.text = error.message;
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
          this.snackbar = true;
          this.color = "error";
          this.text = error.message;
          console.log(error);
        });
    },
    // calculeSchedule() {
    // (    const start) = this.mapStringToDate(new Date(date[(0]), this.start));
    //   const end = this.mapStringToDate(new Date(date[0]), this.end);
    //   (return [{ start), end }];
    // },
    newBooking(e) {
    //    window.createBooking = (data = {}) => {
    //    const BASE = "http://localhost:3000/api";
    //    const url = `${BASE}/newBooking`;
    //    debugger;
    //    return fetch(url, {
    //      method: "POST",
    //      body: JSON.stringify(data),
    //      headers: {
    //        Accept: "application/json",
    //        Content: "application/json"
    //      }
    //    })
    //      .then(res => {
    //        if (res.status !== 200) return Promise.reject(res);
    //        return res.json();
    //      })
    //      .then(res => {
    //        console.log(res.data.bookings);
    //        this.bookings = res.data.bookings;
    //        this.snackbar = true;
    //        this.color = "success";
    //        this.text = "¡Su solicitud de reserva se realizo correctamente!";
    //      })
    //      .catch(e => {
    //        console.log({e});
    //      });
    //    debugger;
    //  };
      // this.schedules = this.calculeSchedule();
      // debugger;
       let payload = {
           cc: this.cc,
           name: this.name,
           event: this.event,
           room: this.room,
           schedules: [this.schedules],
           implement: this.implement
         }
           debugger;
       axios
         .post("api/newBooking", payload)
         .then(res => {
           this.bookings = res.data.bookings;
           this.snackbar = true;
           this.color = "success";
           this.text = "¡Su solicitud de reserva se realizo correctamente!";
         })
         .catch(e => {
           this.snackbar = true;
           this.color = "error";
           this.text = e.response.data.massage
           console.log({e});
         });
         debugger;
    }
  }
};
</script>
