<template>
  <div>
    <v-container>
      <!-- Edit Of Mesh -->
      <v-form
        ref="form"
        v-model="valid"
        v-on:submit="editMeshs(editMesh)"
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

          <v-col sm="12" md="4">
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
           <v-col sm="4" md="3">
            <v-select
              v-model="editMesh.careers"
              label="Carrera"
              :items="career"
              item-text="career"
              item-value="career"
              chips
              small-chips
              flat
              deletable-chips
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="3">
            <v-select
              v-model="editMesh.dayClass"
              label="Dias de clases"
              :items="dClass"
              item-text="day"
              item-value="day"
              chips
              small-chips
              flat
              multiple
              
            >
            </v-select>
          </v-col>
            <v-col sm="6" md="2">
            <v-select
              v-model="editMesh.room"
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
                  <v-list-item-title>No existe coincidencias</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="editMesh.hourStart"
              label="Hora de inicio"
              :items="clock"
              item-text="clock"
              item-value="clock"
              chips
              small-chips
              flat
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="2">
            <v-select
              v-model="editMesh.hourEnd"
              label="Hora de finalización"
              :items="clock"
              item-text="clock"
              item-value="clock"
              chips
              flat
              small-chips
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
              small-chips
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
            <v-btn rounded color="error black--text" @click="edit = true">
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
        v-if="edit"
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

          <v-col sm="12" md="4">
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
          <v-col sm="4" md="3">
            <v-select
              v-model="careers"
              label="Carrera"
              :items="career"
              item-text="career"
              item-value="career"
              chips
              small-chips
              flat
              deletable-chips
            >
            </v-select>
          </v-col>
          <v-col sm="4" md="3">
            <v-select
              v-model="dayClass"
              label="Dias de clases"
              :items="dClass"
              item-text="day"
              item-value="day"
              chips
              small-chips
              flat
              multiple
              deletable-chips
            >
            </v-select>
          </v-col>
          <v-col sm="6" md="2">
            <v-select
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
                  <v-list-item-title>No existe coincidencias</v-list-item-title>
                </v-list-item>
              </template>
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
              small-chips
              deletable-chips
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
              deletable-chips
              small-chips
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
              small-chips
              deletable-chips
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
            :search="search"
            item-key="idMetter"
            class="elevation-1"
          >
            <template v-slot:items />
            <template slot="item.icon" slot-scope="data">
              <v-btn
                icon
                v-on:click="onlyMesh(data.item._id)"
                aria-label="edit"
              >
                <v-icon small color="edit">fa fa-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                v-on:click="deleteMesh(data.item._id)"
                aria-label="delete"
              >
                <v-icon small color="error">fa fa-trash</v-icon>
              </v-btn>
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
      salons: [],
      singleExpand: true,
      edit: true,
      search: "",
      valid: true,
      idMetter: "",
      matter: "",
      room: "",
      hourStart: "",
      hourEnd: "",
      semester: "",
      teacher: "",
      ht: "",
      hp: "",
      htp: "",
      dayClass: [],
      careers: [],
      headers: [
        {
          text: "CÓDIGO",
          align: "center",
          sortable: false,
          value: "idMetter"
        },
        {
          text: "ASIGNATURA",
          value: "matter",
          sortable: false,
          align: "center"
        },
        { text: "CARRERA", value: "career", sortable: false, align: "center" },
        { text: "DOCENTE", value: "teacher", sortable: false, align: "center" },
        { text: "SALON", value: "room", sortable: false, align: "center" },
        {
          text: "DÍA(S) DE CLASE",
          value: "dayClass",
          sortable: false,
          align: "center"
        },
        {
          text: "HORA INICIO",
          value: "hourStart",
          sortable: false,
          align: "center"
        },
        {
          text: "HORA FIN",
          value: "hourEnd",
          sortable: false,
          align: "center"
        },
        {
          text: "SEMESTRE",
          value: "semester",
          align: "center",
          sortable: false
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
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
      career: [
        { career: "Ingenieria sistemas" },
        { career: "Ingeniera industrial" },
        { career: "Psicología" },
        { career: "Derecho" },
        { career: "Trabajo Social" },
        { career: "Antropología" },
        { career: "Administración de empresa" }
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
    this.getSalon();
  },
  mounted() {
    this.valid = false;
  },
  methods: {
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
    getMesh() {
      axios
        .get("/api/mesh")
        .then(res => {
          this.items = res.data.Meshs;
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
          hourStart: this.hourStart,
          hourEnd: this.hourEnd,
          semester: this.semester,
          teacher: this.teacher,
          dayClass: this.dayClass,
          career: this.careers,
          room: this.room
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
    },
    // Only Mesh (Pasa un solo dato de la tabla para hacer el update)
    onlyMesh(id) {
      this.edit = false;
      axios
        .get(`/api/mesh/${id}`)
        .then(res => {
          this.editMesh = res.data;
          this.$refs.idMetter.focus();
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    },
    // Edit Mesh
    editMeshs(item) {
      axios.put(`/api/updateMesh/${item._id}`, item).then(res => {
        const index = this.items.findIndex(n => n._id === res.data._id);
        this.items[index].idMetter = res.data.idMetter;
        this.items[index].matter = res.data.matter;
        this.items[index].hourStart = res.data.hourStart;
        this.items[index].hourEnd = res.data.hourEnd;
        this.items[index].semester = res.data.semester;
        this.items[index].teacher = res.data.teacher;
        this.items[index].dayClass = res.data.dayClass;
        this.items[index].room = res.data.room;
        this.items[index].career = res.data.career;
        this.snackbar = true;
        this.color = "success";
        this.text = "¡Datos de la asignatura actualizados correctamente!";
        this.edit = false;
      });
    },
    //Delete Mesh
    deleteMesh(id) {
      const response = confirm("Esta seguro de eliminar esta asignatura?");
      if (response) {
        axios
          .delete("/api/deleteMesh/" + id)
          .then(res => {
            console.log("Mesh Delete: ", id);
            this.items.splice(id, 1);
            this.snackbar = true;
            this.color = "success";
            this.text = "¡Asignatura eliminada exitosamente!";
            this.$router.go();
          })
          .catch(e => {
            this.snackbar = true;
            this.color = "error";
            this.text = e.message;
            console.log("Unable to clear the mesh", e);
          });
      }
      return;
    }
  }
};
</script>
