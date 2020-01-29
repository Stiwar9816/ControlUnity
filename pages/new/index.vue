<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-subheader class="subtitle-1">MALLA CURRICULAR</v-subheader>
        <!-- Calendar events -->
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64" class="elevation-1">
              <v-toolbar flat color="white">
                <v-btn outlined class="mr-4" @click="setToday">
                  Hoy
                </v-btn>
                <v-btn fab text small @click="prev">
                  <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small @click="next">
                  <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on }">
                    <v-btn outlined v-on="on">
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Día</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Semana</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Mes</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 Días</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="350">
              <v-calendar
                class="elevation-1"
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :event-margin-bottom="3"
                :now="today"
                :type="type"
                locale="es"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
               
              ></v-calendar>
              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                full-width
                offset-x
              >
                <v-card color="grey lighten-4" min-width="380px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
            <br />

            <!-- Modal -->
            <v-row justify="center">
              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn absolute dark fab right color="primary" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Crear Reserva</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!-- Formulario de reservas -->
                        <v-form
                          ref="form"
                          v-on:submit="newBooking()"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-row>
                            <!-- inputs -->
                            <v-col sm="4" md="4">
                              <v-text-field
                                v-model="cc"
                                :rules="ccRules"
                                autofocus
                                label="C.C"
                                type="number"
                                min="1"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col sm="4" md="8">
                              <v-text-field
                                v-model="name"
                                :rules="nameRules"
                                type="text"
                                pattern="[A-Za-z\s]"
                                maxlength="45"
                                label="Nombre de la persona responsable"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col sm="4" md="4">
                              <v-text-field
                                v-model="event"
                                :rules="eventRules"
                                label="Materia o evento"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col sm="6" md="4">
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
                            <v-col sm="6" md="4">
                              <v-autocomplete
                                v-model="room"
                                :rules="[
                                  v => !!v || 'Nombre del salon es requerido'
                                ]"
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
                                      >No existe
                                      coincidencias</v-list-item-title
                                    >
                                  </v-list-item>
                                </template>
                              </v-autocomplete>
                            </v-col>
                          </v-row>
                          <v-row>
                            <!-- DatePicker -->
                            <v-col sm="4" md="4">
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
                                  min="2020-01-17"
                                  locale="es"
                                  first-day-of-week="1"
                                  multiple
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="DateModal = false"
                                    >Cancelar</v-btn
                                  >
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(date)"
                                    >OK</v-btn
                                  >
                                </v-date-picker>
                              </v-dialog>
                            </v-col>
                            <!-- End DatePicker -->
                            <!-- Implementos -->
                            <v-col sm="6" md="8">
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
                              >
                                <template v-slot:no-data>
                                  <v-list-item>
                                    <v-list-item-title
                                      >No hay información
                                      registrada</v-list-item-title
                                    >
                                  </v-list-item>
                                </template>
                              </v-combobox>
                            </v-col>
                            <!-- End implementos -->
                            <v-col sm="4" md="6">
                              <v-select
                                v-model="Hstart"
                                label="Hora de inicio"
                                :items="clock"
                                item-text="clock"
                                item-value="clock"
                                chips
                                flat
                              >
                              </v-select>
                            </v-col>
                            <v-col sm="4" md="6">
                              <v-select
                                v-model="Hend"
                                label="Hora de finalización"
                                :items="clock"
                                item-text="clock"
                                item-value="clock"
                                chips
                                flat
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                          <!-- boton reservar -->
                          <v-row justify="center">
                            <v-btn
                              rounded
                              color="error black--text"
                              aria-label="Cancel booking"
                              class="mt-5 mr-4"
                              @click="dialog = false"
                            >
                              <v-icon dark>fa fa-ban</v-icon>Cancelar
                            </v-btn>
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
                        <!-- End Formulario de reservas -->
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-row>
            <!-- End Modal -->
          </v-col>
        </v-row>
        <!-- End Calendar events -->

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
      dialog: false,
      date: [],
      cc: "",
      name: "",
      event: "",
      capacity: "",
      room: "",
      implement: "",
      DateModal: false,
      valid: true,
      Hstart: "",
      Hend: "",
      snackbar: false,
      text: "",
      color: "",
      //Validaciones de campos
      ccRules: [v => !!v || "Cedula de ciudadania del usuario es requerida"],
      nameRules: [
        v => !!v || "Nombre del usuario es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
      eventRules: [
        v => !!v || "Nombre de la materia o evento es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
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
      bookings: [],
      clock: [
        { clock: "06:00" },
        { clock: "06:30" },
        { clock: "07:00" },
        { clock: "07:30" },
        { clock: "08:00" },
        { clock: "08:30" },
        { clock: "09:00" },
        { clock: "09:30" },
        { clock: "10:00" },
        { clock: "10:30" },
        { clock: "11:00" },
        { clock: "11:30" },
        { clock: "12:00" },
        { clock: "12:30" },
        { clock: "13:00" },
        { clock: "13:30" },
        { clock: "14:00" },
        { clock: "14:30" },
        { clock: "15:00" },
        { clock: "15:30" },
        { clock: "16:00" },
        { clock: "16:30" },
        { clock: "17:00" },
        { clock: "17:30" },
        { clock: "18:00" },
        { clock: "18:30" },
        { clock: "19:00" },
        { clock: "19:30" },
        { clock: "20:00" },
        { clock: "20:30" },
        { clock: "21:00" },
        { clock: "21:30" },
        { clock: "22:00" }
      ],
      today: "2020-01-28",
      focus: "2020-01-28",
      type: "month",
      typeToLabel: {
        month: "Mes",
        week: "Semana",
        day: "Día",
        "4day": "4 Días"
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [
        {
          name: "event 7",
          start: "2020-01-28 22:00",
          end: "2020-01-30 23:00",
          color: "#4285F4"
        }
      ]
    };
  },
  created() {
    this.getSalon();
    this.getImplements();
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  // mounted() {
  //   this.$refs.calendar.checkChange();
  //   this.valid = false;
  // },
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
    newBooking() {
      axios
        .post("api/newBooking", {
          cc: this.cc,
          name: this.name,
          event: this.event,
          room: this.room,
          date: this.date,
          Hstart: this.Hstart,
          Hend: this.Hend,
          implement: this.implement
        })
        .then(res => {
          this.bookings = res.data.bookings;
          this.snackbar = true;
          this.color = "success";
          this.text = "¡Su solicitud de reserva se realizo correctamente!";
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    }
  },
  viewDay({ date }) {
    this.focus = date;
    this.type = "day";
  },
  getEventColor(event) {
    return event.color;
  },
  setToday() {
    this.focus = this.today;
  },
  prev() {
    this.$refs.calendar.prev();
  },
  next() {
    this.$refs.calendar.next();
  },
  showEvent({ nativeEvent, event }) {
    const open = () => {
      this.selectedEvent = event;
      this.selectedElement = nativeEvent.target;
      setTimeout(() => (this.selectedOpen = true), 10);
    };

    if (this.selectedOpen) {
      this.selectedOpen = false;
      setTimeout(open, 10);
    } else {
      open();
    }

    nativeEvent.stopPropagation();
  },
  updateRange({ start, end }) {
    // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
    this.start = start;
    this.end = end;
  },
  nth(d) {
    return d > 3 && d < 21
      ? "th"
      : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
  }
};
</script>
