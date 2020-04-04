<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">IMPLEMENTOS REGISTRADOS</v-subheader>
      <v-container>
        <v-switch inset v-model="switch1" label="Mostrar Formulario"></v-switch>
        <!-- Editar Datos de implemento -->
        <v-form
          ref="form"
          v-model="valid"
          v-on:submit="editImplement(editImplements)"
          v-if="!edit"
          v-show ="switch1"
          lazy-validation
          novalidate
          aria-autocomplete="off"
        >
          <v-row>
            <!-- inputs -->
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                ref="serial"
                v-model="editImplements.serial"
                :rules="serailRules"
                label="Serial"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="editImplements.name"
                :rules="implementRules"
                label="Implemento"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="3">
              <v-text-field
                v-model="editImplements.mark"
                :rules="markRules"
                label="Marca"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="editImplements.type"
                :rules="typeRules"
                label="Tipo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="editImplements.model"
                :rules="modelRules"
                label="Modelo"
                required
              ></v-text-field>
            </v-col>
             <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="editImplements.location"
                :rules="locationRules"
                label="Ubicación"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="editImplements.user"
                :rules="userRules"
                label="Respondable"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="editImplements.state"
                :rules="stateRules"
                label="Estado"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="5">
              <v-textarea
                v-model="editImplements.description"
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
                <v-icon dark>fa fa-check</v-icon>Confirmar
              </v-btn>
              <v-btn rounded color="error black--text" @click="edit = true">
                <v-icon dark>fa fa-ban</v-icon>Cancelar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- Crear nuevo impliento -->
        <v-form
          ref="form"
          v-model="valid"
          v-on:submit="NewImplement()"
          v-if="edit"
          v-show="switch1"
          lazy-validation
          novalidate
          aria-autocomplete="off"
        >
          <v-row>
            <!-- inputs -->
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                autofocus
                v-model="serial"
                :rules="serailRules"
                label="Serial"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="name"
                :rules="implementRules"
                label="Nombre del implemento"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="3">
              <v-text-field
                v-model="mark"
                :rules="markRules"
                label="Marca"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="type"
                :rules="typeRules"
                label="Tipo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="model"
                :rules="modelRules"
                label="Modelo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="location"
                :rules="locationRules"
                label="Ubicación"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="user"
                :rules="userRules"
                label="Respondable"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="state"
                :rules="stateRules"
                label="Estado del implemento"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="5">
              <v-textarea
                v-model="description"
                autoGrow
                required
                rows="1"
                row-height="20"
                label="Descripción acerca del estado del implemento"
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
          <v-col md="4" sm="6">
            <v-text-field
              prepend-icon="fa fa-search"
              v-model="search"
              class="mb-5"
              label="Buscar implemento"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :sort-by="['type']"
          :sort-desc="[true]"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:items />
          <template slot="item.icon" slot-scope="data">
            <v-btn
              icon
              v-on:click="onlyImplement(data.item._id)"
              aria-label="edit"
            >
              <v-icon small color="edit">fa fa-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              v-on:click="deleteImplement(data.item._id)"
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
      search: "",
      valid: true,
      switch1: true,
      edit: true,
      serial: "",
      name: "",
      mark: "",
      type: "",
      model: "",
      location: "",
      user: "",
      description: "",
      state: "",
      snackbar: false,
      text: "",
      color: "",
      serailRules: [v => !!v || "Serial del implemento es requerido"],
      implementRules: [v => !!v || "Nombre del implemento es requerido"],
      markRules: [
        v => !!v || "Marca del implemento es requerida",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
      typeRules: [
        v => !!v || "Tipo de implemento es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
      modelRules: [v => !!v || "Modelo del implemento es requerido"],
      locationRules: [
        v => !!v || "Ubicación del implemento es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
      userRules: [
        v => !!v || "Usuario responsable del implemento es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
      stateRules: [
        v => !!v || "Estado del implemento es requerido",
        v => /[a-zA-Z]+$/.test(v) || "Este campo no admite numeros"
      ],
      headers: [
        { text: "SERIAL", align: "center", sortable: false, value: "serial" },
        { text: "IMPLEMENTO", align: "center", value: "name", sortable: false },
        { text: "MARCA", align: "center", value: "mark", sortable: false },
        { text: "TIPO", align: "center", value: "type", sortable: true },
        { text: "MODELO", align: "center", value: "model", sortable: false },
        {
          text: "UBICACIÓN",
          align: "center",
          value: "location",
          sortable: false
        },
        {
          text: "RESPONSABLE",
          align: "center",
          value: "user",
          sortable: false
        },
        {
          text: "DESCRIPCIÓN",
          align: "center",
          sortable: false,
          value: "description"
        },
        { text: "ESTADO", align: "center", value: "state" },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: [],
      editImplements: {}
    };
  },
  async created() {
    try {
      const res = await axios.get(`/api/implement`);
      this.items = await res.data.implement;
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
    //Add New Salon
    async NewImplement() {
      axios
        .post("/api/newImplement", {
          serial: this.serial,
          name: this.name,
          mark: this.mark,
          type: this.type,
          model: this.model,
          location: this.location,
          user: this.user,
          description: this.description,
          state: this.state
        })
        .then(res => {
          this.snackbar = true;
          this.color = "success";
          this.text = "¡Nuevo implemento agregado con exito!";
          this.implement;
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    },
    // Only Implement (Pasa un solo dato de la tabla para hacer el update)
    onlyImplement(id) {
      this.edit = false;
      axios
        .get(`/api/implement/${id}`)
        .then(res => {
          this.editImplements = res.data;
          this.$refs.serial.focus();
        })
        .catch(e => {
          this.snackbar = true;
          this.color = "error";
          this.text = e.message;
          console.log(e);
        });
    },
    // Edit Implement
    editImplement(item) {
      axios.put(`/api/updateImplement/${item._id}`, item).then(res => {
        const index = this.items.findIndex(n => n._id === res.data._id);
        this.items[index].serial = res.data.serial;
        this.items[index].name = res.data.name;
        this.items[index].mark = res.data.mark;
        this.items[index].type = res.data.type;
        this.items[index].model = res.data.model;
        this.items[index].location = res.data.location;
        this.items[index].user = res.data.user;
        this.items[index].description = res.data.description;
        this.items[index].state = res.data.state;
        this.snackbar = true;
        this.color = "success";
        this.text = "¡Datos del implemento actualizados correctamente!";
        this.edit = false;
      });
    },
    //Delete Implement
    deleteImplement(id) {
      const response = confirm("Esta seguro de eliminar este implemento?");
      if (response) {
        axios
          .delete("/api/deleteImplement/" + id)
          .then(res => {
            console.log("Implement Delete: ", id);
            this.items.splice(id, 1);
            this.snackbar = true;
            this.color = "success";
            this.text = "¡Implemento eliminado exitosamente!";
            this.$router.go();
          })
          .catch(e => {
            this.snackbar = true;
            this.color = "error";
            this.text = e.message;
            console.log("Unable to clear the implement", e);
          });
      }
      return;
    }
  }
};
</script>
