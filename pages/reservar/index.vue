<template>
  <v-layout>
    <v-flex>
      <h3 class="title mt-3">CREAR RESERVA</h3>
      <v-container>
        <v-form>
          <v-row cols="12" xs="12" sm="12" md="3">
            <!-- inputs -->
            <v-col>
              <v-text-field label="C.C" type="number" min="0" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Nombre" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Materia o evento" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="2">
              <v-text-field label="Capacidad salon" type="number" min="0" required></v-text-field>
            </v-col>
            <v-col md="2">
              <v-select :items="salon" label="Salon"></v-select>
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
                  <v-text-field v-model="date" label="Fecha de reserva" readonly v-on="on"></v-text-field>
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
                  <v-text-field v-model="time" label="Hora de reserva" v-on="on"></v-text-field>
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
            <v-btn rounded color="primary" type="submit">
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
      TimeModal: false,
      date: "",
      DateModal: false,
      headers: [
        { text: "SERIAL", align: "center", sortable: false },
        { text: "IMPLEMENTO", align: "center" },
        { text: "STOCK", align: "center", sortable: false },
        { text: "MARCA", align: "center" },
        { text: "ACCIONES", align: "center", sortable: false }
      ],
      salon: ["Salon 102", "Salon 302"]
    };
  }
};
</script>