<template>
  <div>
    <v-container>
      <!-- Edit Of Mesh -->
      <v-form
        ref="form"
        v-model="valid"
        v-on:submit="editMesh(editMesh)"
        v-if="edit"
        lazy-validation
      >
        <v-row>
          <!-- inputs -->
          <!-- inputs -->
          <v-col sm="4" md="2">
            <v-text-field
              autofocus
              min="0"
              type="text"
              v-model="editMesh.idMetter"
              :rules="codRules"
              label="Código materia"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="3">
            <v-text-field
              v-model="editMesh.matter"
              :rules="classRules"
              label="Asginatura"
              required
            ></v-text-field>
          </v-col>

          <v-col sm="12" md="3">
            <v-autocomplete
              v-model="editMesh.teacher"
              :rules="[v => !!v || 'Nombre del docente es requerido']"
              label="Docente"
              :items="teachers"
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

          <v-col sm="4" md="1">
            <v-text-field
              v-model="editMesh.ht"
              label="HT"
              type="number"
              min="0"
              max="100"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="1">
            <v-text-field
              v-model="editMesh.hp"
              label="HP"
              type="number"
              min="0"
              max="100"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="1">
            <v-text-field
              v-model="editMesh.htp"
              label="HTP"
              type="number"
              min="0"
              max="100"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="1">
            <v-text-field
              v-model="editMesh.credits"
              label="Creditos"
              type="number"
              min="0"
              max="20"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="3">
            <v-select
              v-model="editMesh.dayClass"
              label="Dias de clases"
              :items="dClass"
              item-text="day"
              item-value="day"
              chips
              flat
              multiple
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="editMesh.start"
              label="Hora de inicio"
              :items="clock"
              item-text="clock"
              item-value="clock"
              chips
              flat
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="editMesh.end"
              label="Hora de finalización"
              :items="clock"
              item-text="clock"
              item-value="clock"
              chips
              flat
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="editMesh.semester"
              label="Semestre"
              :items="semesters"
              item-text="nivel"
              item-value="nivel"
              chips
              flat
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              rounded
              color="success black--text mr-2"
              type="submit"
              :disabled="!valid"
            >
              <v-icon dark>fa fa-check</v-icon>Editar
            </v-btn>
            <v-btn rounded color="error black--text" @click="edit = false">
              <v-icon dark>fa fa-ban</v-icon>Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <!-- Form Of New Mesh -->
      <v-form
        ref="form"
        v-model="valid"
        v-on:submit="NewMesh()"
        v-if="!edit"
        lazy-validation
      >
        <v-row>
          <!-- inputs -->
          <v-col sm="4" md="2">
            <v-text-field
              autofocus
              min="0"
              type="text"
              v-model="idMetter"
              :rules="codRules"
              label="Código materia"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="3">
            <v-text-field
              v-model="matter"
              :rules="classRules"
              label="Asginatura"
              required
            ></v-text-field>
          </v-col>

          <v-col sm="12" md="3">
            <v-autocomplete
              v-model="teacher"
              :rules="[v => !!v || 'Nombre del docente es requerido']"
              label="Docente"
              :items="teachers"
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

          <v-col sm="4" md="1">
            <v-text-field
              v-model="ht"
              label="HT"
              type="number"
              min="0"
              max="100"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="1">
            <v-text-field
              v-model="hp"
              label="HP"
              type="number"
              min="0"
              max="100"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="1">
            <v-text-field
              v-model="htp"
              label="HTP"
              type="number"
              min="0"
              max="100"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="1">
            <v-text-field
              v-model="credits"
              label="Creditos"
              type="number"
              min="0"
              max="20"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" md="3">
            <v-select
              v-model="dayClass"
              label="Dias de clases"
              :items="dClass"
              item-text="day"
              item-value="day"
              chips
              flat
              multiple
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="hourStart"
              label="Hora de inicio"
              :items="clock"
              item-text="clock"
              item-value="clock"
              chips
              flat
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="hourEnd"
              label="Hora de finalización"
              :items="clock"
              item-text="clock"
              item-value="clock"
              chips
              flat
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="semester"
              label="Semestre"
              :items="semesters"
              item-text="nivel"
              item-value="nivel"
              chips
              flat
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              rounded
              color="primary black--text"
              type="submit"
              :disabled="!valid"
            >
              <v-icon dark>fa fa-plus</v-icon>Agregar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-card flat>
        <v-card-text>
          <v-row cols="12">
            <v-col md="4">
              <v-text-field
                prepend-icon="fa fa-search"
                v-model="search"
                class="mb-5"
                label="Buscar Asignatura"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="items"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="idMetter"
            show-expand
          >
          <template v-slot:items />
            <template v-slot:expanded-item="{ headers }" v-model="singleExpand">
              <template>
                <v-layout row wrap pb-2 pt-2 pl-5>
                  <v-flex>
                    <v-card flat>
                      <v-card-text>
                        <p class="subheading">General</p>
                        <span class="font-weight-medium">Docente</span>
                        <br />
                        <span class="font-weight-medium">Jilmar peña</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex>
                    <v-card flat>
                      <v-card-text>
                        <p class="subheading">Horas</p>
                        <span class="font-weight-medium">HT: </span>
                        <span class="font-weight-medium">12</span>
                        <br />
                        <span class="font-weight-medium">HP: </span>
                        <span class="font-weight-medium">12</span>
                        <br />
                        <span class="font-weight-medium">HTP: </span>
                        <span class="font-weight-medium">0</span>
                        <br />
                        <span class="font-weight-medium">TOTAL HORAS: </span>
                        <span class="font-weight-medium">24</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex>
                    <v-card flat>
                      <v-card-text>
                        <p class="subheading">Horario</p>

                        <span class="font-weight-medium">Lunes y viernes</span>
                        <br />
                        <span class="font-weight-medium">7:30 y viernes</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex>
                    <v-card flat>
                      <v-card-text>
                        <p class="subheading">Créditos</p>
                        <span class="font-weight-medium">3</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex right>
                    <v-card flat>
                      <v-card-text>
                        <p class="subheading">Acciones</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </template>
            </template>
            <template v-slot:no-results>
              <span class="font-weight-regular black--text"
                >No se encontraron coincidencias</span
              >
            </template>
            <template v-slot:no-data>
              <span class="font-weight-regular black--text"
                >No hay información registrada</span
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  layout: "home",
  data() {
    return {
      expanded: [],
      editMesh: {},
      singleExpand: true,
      edit: false,
      search: "",
      valid: true,
      idMetter: "",
      matter: "",
      credits: "",
      hourStart: "",
      hourEnd: "",
      semester: "",
      teacher: "",
      ht:"",
      hp:"",
      htp:"",
      dayClass: [],
      headers: [
        {
          text: "CÓDIGO",
          align: "center",
          sortable: false,
          value: "idMetter"
        },
        { text: "ASIGNATURA", value: "matter", sortable: false, align: "center" },
        { text: "SEMESTRE", value: "semester", align: "center", sortable: false },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" },
        { text: "", value: "data-table-expand" }
      ],
      items: [],
      teachers: [],
      semesters: [
        { nivel: "1" },
        { nivel: "2" },
        { nivel: "3" },
        { nivel: "4" },
        { nivel: "5" },
        { nivel: "6" },
        { nivel: "7" },
        { nivel: "8" },
        { nivel: "9" },
        { nivel: "10" }
      ],
      dClass: [
        { day: "Lunes" },
        { day: "Martes" },
        { day: "Miercoles" },
        { day: "Jueves" },
        { day: "Viernes" },
        { day: "Sabádo" },
        { day: "Domingo" }
      ],
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
      codRules: [v => !!v || "Codigo de la materia es requerida"],
      classRules: [
        v => !!v || "Estado del implemento es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ]
    };
  },
  created() {
    this.getMesh();
    this.getTeacher();
  },
  mounted() {
    this.valid = false;
  },
  methods: {
    getTeacher() {
      axios
        .get("/api/teacher")
        .then(res => {
          this.teachers = res.data.Teachers;
        })
        .catch(error => {
          this.snackbar = true;
          this.color = "error";
          this.text = error.message;
          console.log(error);
        });
    },
    getMesh(){
      axios
        .get("/api/mesh")
        .then(res => {
          this.items = res.data.Mesh;
          console.log("Mesh",this.items);
        })
        .catch(error => {
          this.snackbar = true;
          this.color = "error";
          this.text = error.message;
          console.log(error);
        });
    },
      //New Mesh
    async NewMesh() {
      await axios
        .post(`/api/newMesh/`, {
          idMetter: this.idMetter,
          matter: this.matter,
          credits: this.credits,
          hourStart: this.hourStart,
          hourEnd: this.hourEnd,
          semester: this.semester,
          teacher: this.teacher,
          dayClass: this.dayClass,
          ht: this.ht,
          hp: this.hp,
          htp: this.htp
        })
        .then(res => {
          this.mesh;
          this.snackbar = true;
          this.color = "success";
          this.text = "¡Información agregada con exito!";
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    }
  }
};
</script>