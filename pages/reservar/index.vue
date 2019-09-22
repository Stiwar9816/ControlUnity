<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">CREAR RESERVA</v-subheader>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row cols="12" xs="12" sm="12" md="3">
            <!-- inputs -->
            <v-col>
              <v-text-field
                v-model="cc"
                :rules="ccRules"
                label="C.C"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="name" :rules="nameRules" label="Nombre" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="event" :rules="eventRules" label="Materia o evento" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="2">
              <v-text-field
                v-model="capacitySalon"
                :rules="capacitySalonRules"
                label="Capacidad salon"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col md="2">
              <v-autocomplete
                v-model="salon"
                :rules="[v => !!v || 'Nombre del salon es requerido']"
                label="Salon"
                :items="salon"
              ></v-autocomplete>
            </v-col>

            <!--DatePicker  -->
            <v-col>
              <v-menu
                v-model="DateModal"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                full-width
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
                <v-date-picker v-model="date" @input="DateModal = false"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- End DatePicker -->

            <!-- TimePicker -->
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="TimeModal"
                :return-value.sync="time"
                transition="scale-transition"
                full-width
                width="250px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="time" :rules="timeRules" label="Hora de reserva" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="TimeModal" v-model="time" full-width>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="$refs.dialog.save(time)">Aceptar</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <!-- End TimePicker -->
          </v-row>
          <!-- boton reservar -->
          <v-row justify="center">
            <v-btn rounded color="primary" type="submit" :disabled="!valid" @click="validate">
              <v-icon dark>mdi-plus</v-icon>Agregar
            </v-btn>
          </v-row>
          <!-- End Boton reservar -->
        </v-form>
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
      time: "",
      date: "",
      cc: "",
      name: "",
      event: "",
      capacitySalon: "",
      salon: "",
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
      salon: ["Salon 102", "Salon 302"]
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>