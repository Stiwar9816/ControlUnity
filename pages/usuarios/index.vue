<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">USUARIOS REGISTRADOS</v-subheader>
      <v-container>
        <!-- Tabla -->
        <v-row cols="12">
          <v-col md="4">
            <v-text-field
              prepend-icon="fa fa-search"
              v-model="search"
              class="mt-4 mb-5"
              label="Buscar usuarios"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template slot="items" slot-scope="data"></template>
          <template slot="item.icon" slot-scope="data">
            <v-btn
              icon
              v-on:click="deleteUser(data.item._id)"
              aria-label="delete"
            >
              <v-icon color="error" small>fa fa-trash</v-icon>
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
      snackbar: false,
      text: "",
      color: "",
      headers: [
        { text: "CEDULA", align: "center", sortable: false, value: "cc" },
        {
          text: "NOMBRE COMPLETO",
          align: "center",
          value: "name",
          sortable: false
        },
        {
          text: "CARGO",
          align: "center",
          value: "role",
          sortable: false
        },
        {
          text: "CORREO ELECTRONICO",
          align: "center",
          sortable: false,
          value: "email"
        },
        { text: "ACCIONES", align: "center", sortable: false, value: "icon" }
      ],
      items: []
    };
  },
  async created() {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`/api/user?token=${token}`);
      this.items = await res.data.users;
    } catch (error) {
      this.snackbar = true;
      this.text = error.message;
      console.log(error);
    }
  },
  methods: {
    //Delete User
    deleteUser(id) {
      const response = confirm("Esta seguro de eliminar este usuario?");
      if (response) {
        axios
          .delete("/api/deleteUser/" + id)
          .then(res => {
            console.log("User Delete: ", id);
            this.items.splice(id, 1);
            this.snackbar = true;
            this.color = "success";
            this.text = "¡Usuario eliminado con exito!";
            this.$router.go();
          })
          .catch(e => {
            this.snackbar = true;
            this.color = "error";
            this.text = e.message;
            console.log("Unable to clear the user", e);
          });
      }
      return;
    }
  }
};
</script>
