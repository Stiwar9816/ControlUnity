<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">SALONES REGISTRADOS</v-subheader>
      <v-container>
        <!-- Edit Of Room -->
        <v-form
          ref="form"
          v-model="valid"
          v-on:submit="editRoom(editRooms)"
          v-if="edit"
          lazy-validation
        >
          <v-row>
            <!-- inputs -->
            <v-col sm="4" md="3">
              <v-text-field
                v-model="editRooms.name"
                :rules="salonRules"
                ref="name"
                label="Nombre Salon"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="2">
              <v-text-field
                v-model="editRooms.location"
                :rules="locationRules"
                label="Ubicación"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="2">
              <v-text-field
                v-model="editRooms.capacity"
                :rules="capacityRules"
                label="Capcidad"
                type="number"
                min="0"
                maxlength="70"
                required
                id="capacity"
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="5">
              <v-textarea
                v-model="editRooms.description"
                :rules="descriptionRules"
                autoGrow
                required
                rows="1"
                row-height="20"
                label="Descripción"
              ></v-textarea>
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
        <!-- Form Of New Room -->
        <v-form
          ref="form"
          v-model="valid"
          v-on:submit="NewRoom()"
          v-if="!edit"
          lazy-validation
        >
          <v-row>
            <!-- inputs -->
            <v-col sm="4" md="3">
              <v-text-field
                autofocus
                v-model="name"
                :rules="salonRules"
                label="Nombre Salon"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="2">
              <v-text-field
                v-model="location"
                :rules="locationRules"
                label="Ubicación"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="4" md="2">
              <v-text-field
                v-model="capacity"
                :rules="capacityRules"
                label="Capacidad"
                type="number"
                min="1"
                max="70"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="5">
              <v-textarea
                v-model="description"
                :rules="descriptionRules"
                autoGrow
                rows="1"
                row-height="20"
                label="Descripción"
              ></v-textarea>
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
              label="Buscar Salon"
              hide-details
            ></v-text-field>
          </v-col>
          <v-spacer />
          <v-col md="4">
            <v-file-input
              :rules="filerules"
              accept=".XLSX, .CSV"
              counter
              show-size
              small-chips
              flat
              prepend-icon="fa fa-folder-open"
              label="Importar Salones"
              ref="file"
              v-on:change="handleFileUpload()"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="accent">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="right">
            <v-btn
              class="mx-2"
              dark
              small
              text
              color="accent"
              v-on:click="EventSubir()"
            >
              Subir Archivo<v-icon dark>fa fa-upload </v-icon>
            </v-btn>
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
            <v-btn icon v-on:click="onlyRoom(data.item._id)" aria-label="edit">
              <v-icon small color="edit">fa fa-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              v-on:click="deleteRoom(data.item._id)"
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
      location: "",
      capacity: "",
      description: "",
      file: "",
      salonRules: [v => !!v || "Nombre del salon es requerido"],
      capacityRules: [v => !!v || "Capacidad del salon es requerida"],
      locationRules: [v => !!v || "Ubicación del salon es requerido"],
      descriptionRules: [v => !!v || "Descripción del salon es requerida"],
      filerules: [
        v =>
          !!v ||
          v.size < 2000000 ||
          "El tamaño del archivo debe ser menor a 2 MB!"
      ],
      headers: [
        { text: "NOMBRE SALON", align: "center", value: "name" },
        {
          text: "UBICACIÓN",
          align: "center",
          sortable: false,
          value: "location"
        },
        {
          text: "CAPACIDAD",
          align: "center",
          sortable: false,
          value: "capacity"
        },
        {
          text: "DESCRIPCIÓN",
          align: "center",
          sortable: false,
          value: "description"
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: [],
      editRooms: {},
      snackbar: false,
      text: "",
      color: ""
    };
  },
  async created() {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`/api/room/?token=${token}`);
      this.items = await res.data.Rooms;
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
    async NewRoom() {
      await axios
        .post(`/api/newRoom/`, {
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
    onlyRoom(id) {
      this.edit = true;
      console.log(id);
      axios
        .get(`api/room/${id}`)
        .then(res => {
          this.editRooms = res.data;
          this.$refs.name.focus();
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    },
    editRoom(item) {
      axios.put(`api/updateRoom/${item._id}`, item).then(res => {
        const index = this.items.findIndex(n => n._id === res.data._id);
        this.items[index].name = res.data.name;
        this.items[index].location = res.data.location;
        this.items[index].capacity = res.data.capacity;
        this.items[index].description = res.data.description;
        this.snackbar = true;
        this.color = "success";
        this.text = "¡Salon Editado con exito!";
        this.edit = false;
        // this.$router.replace({ name: "salones" });
      });
    },
    //Delete Salon
    deleteRoom(id) {
      const response = confirm("Esta seguro de eliminar este salon?");
      if (response) {
        axios
          .delete("api/deleteRoom/" + id)
          .then(res => {
            const index = this.items.findIndex(
              item => item._id === res.data._id
            );
            console.log("Room Delete: ", id);
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
            console.log("Unable to clear the room", e);
          });
      }
      return;
    },
    EventSubir() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("/import-excel-personas", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>
