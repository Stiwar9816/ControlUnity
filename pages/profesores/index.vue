<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">LISTADO DE PROFESORES</v-subheader>
      <v-container>
        <!-- Edit Of Teacher -->
        <v-form
          ref="form"
          v-model="valid"
          v-on:submit="editTeacher(editTeachers)"
          v-if="edit"
          lazy-validation
        >
          <v-row>
            <!-- inputs -->
            <v-col sm="4" md="2">
              <v-text-field
                autofocus
                v-model="cc"
                :rules="ccRules"
                label="Cedula de ciudadania"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="4">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nombre completo"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="3">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                type="email"
                min="1"
                max="70"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="3">
              <v-select
                v-model="lessons"
                :rules="lessonsRules"
                multiple
                label="Materias"
              ></v-select>
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
        <!-- Form Of New Teacher -->
        <v-form
          ref="form"
          v-model="valid"
          v-on:submit="NewTeacher()"
          v-if="!edit"
          lazy-validation
        >
          <v-row>
            <!-- inputs -->
            <v-col sm="4" md="2">
              <v-text-field
                autofocus
                v-model="cc"
                :rules="ccRules"
                label="Cedula de ciudadania"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="4">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nombre completo"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="3">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                type="email"
                min="1"
                max="70"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="3">
              <v-select
                v-model="lessons"
                :rules="lessonsRules"
                multiple
                label="Materias"
              ></v-select>
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
        <!-- Tabla -->
        <v-row cols="12">
          <v-col md="4">
            <v-text-field
              prepend-icon="fa fa-search"
              v-model="search"
              class="mb-5"
              label="Buscar Profesor"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :sort-by="['name']"
          :sort-desc="[false]"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:items />
          <template slot="item.icon" slot-scope="data">
            <v-btn
              icon
              v-on:click="onlyTeacher(data.item._id)"
              aria-label="edit"
            >
              <v-icon small color="edit">fa fa-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              v-on:click="deleteTeacher(data.item._id)"
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
      edit: false,
      search: "",
      valid: true,
      edit: false,
      name: "",
      cc: "",
      email: "",
      lessons: "",
      ccRules: [v => !!v || "Nombre del salon es requerido"],
      nameRules: [
        v => !!v || "Estado del implemento es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
      lessonsRules: [v => !!v || "Ubicación del salon es requerido"],
      emailRules: [
        v => !!v || "Correo electronico es requerido ",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Correo electronico no es valido, Verifiquelo nuevamente"
      ],
      headers: [
        { text: "C.C", align: "center", value: "cc" },
        {
          text: "NOMBRE COMPLETO",
          align: "center",
          sortable: false,
          value: "name"
        },
        {
          text: "EMAIL",
          align: "center",
          sortable: false,
          value: "email"
        },
        {
          text: "MATERIAS",
          align: "center",
          sortable: false,
          value: "lessons"
        },
        {
          text: "ESTADO",
          align: "center",
          sortable: false,
          value: "status"
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: [],
      editTeachers: {},
      snackbar: false,
      text: "",
      color: ""
    };
  },
  async created() {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`/api/teacher/?token=${token}`);
      this.items = await res.data.Teachers;
    } catch (error) {
      this.snackbar = true;
      this.color = "error";
      this.text = error.message;
      console.log(error);
    }
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

    //New Salon
    async NewTeacher() {
      await axios
        .post(`/api/newTeacher/`, {
          name: this.name,
          location: this.location,
          capacity: this.capacity,
          description: this.description
        })
        .then(res => {
          this.salon;
          this.snackbar = true;
          this.color = "success";
          this.text = "¡Salon agregado con exito!";
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    },
    onlyTeacher(id) {
      this.edit = true;
      console.log(id);
      axios
        .get(`api/teacher/${id}`)
        .then(res => {
          this.editTeachers = res.data;
          this.$refs.name.focus();
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    },
    editTeacher(item) {
      axios.put(`api/updateTeacher/${item._id}`, item).then(res => {
        const index = this.items.findIndex(n => n._id === res.data._id);
        this.items[index].name = res.data.name;
        this.items[index].location = res.data.location;
        this.items[index].capacity = res.data.capacity;
        this.items[index].description = res.data.description;
        this.$router.replace({ name: "salones" });
        this.edit = false;
        this.snackbar = true;
        this.color = "success";
        this.text = "¡Salon Editado con exito!";
      });
    },
    //Delete Salon
    deleteTeacher(id) {
      const response = confirm("Esta seguro de eliminar este salon?");
      if (response) {
        axios
          .delete("api/deleteTeacher/" + id)
          .then(res => {
            const index = this.items.findIndex(
              item => item._id === res.data._id
            );
            console.log("Teacher Delete: ", id);
            this.items.splice(index, 1);
            this.snackbar = true;
            this.color = "success";
            this.text = "¡Salon eliminado con exito!";
            this.$router.go();
          })
          .catch(e => {
            this.snackbar = true;
            this.color = "error";
            this.text = e.message;
            console.log("Unable to clear the teacher", e);
          });
      }
      return;
    }
  }
};
</script>
