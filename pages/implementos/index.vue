<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">IMPLEMENTOS REGISTRADOS</v-subheader>
      <v-container>
        <v-form ref="form" v-model="valid" v-on:submit="NewImplement" lazy-validation>
          <v-row>
            <!-- inputs -->
            <v-col sm="12" md="2">
              <v-text-field v-model="serial" :rules="serailRules" label="Serial" required></v-text-field>
            </v-col>
            <v-col sm="12" md="3">
              <v-text-field v-model="implement" :rules="implementRules" label="Implemento" required></v-text-field>
            </v-col>
            <v-col sm="12" md="3">
              <v-text-field v-model="mark" :rules="markRules" label="Marca" required></v-text-field>
            </v-col>
            <v-col sm="12" md="2">
              <v-text-field v-model="type" :rules="typeRules" label="Tipo" required></v-text-field>
            </v-col>
            <v-col sm="12" md="2">
              <v-text-field v-model="model" :rules="modelRules" label="Modelo" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="2">
              <v-text-field v-model="location" :rules="locationRules" label="Ubicación" required></v-text-field>
            </v-col>
            <v-col sm="12" md="2">
              <v-text-field v-model="user" :rules="userRules" label="Respondable" required></v-text-field>
            </v-col>
            <v-col sm="12" md="3">
              <v-text-field v-model="state" :rules="stateRules" label="Estado" required></v-text-field>
            </v-col>
            <v-col sm="12" md="5">
              <v-textarea
                v-model="description"
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
                color="primary black--text"
                type="submit"
                :disabled="!valid"
                @click="NewImplement"
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
          <template slot="items" slot-scope="data" />
          <template slot="item.icon" slot-scope="data">
            <v-btn icon aria-label="edit">
              <v-icon small color="edit">fa fa-pencil</v-icon>
            </v-btn>
            <v-btn icon v-on:click="deleteImplement(data.item._id)" aria-label="delete">
              <v-icon small color="error">fa fa-trash</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-results>
            <span class="font-weight-regular black--text">No se encontraron coincidencias</span>
          </template>
          <template v-slot:no-data>
            <span class="font-weight-regular black--text">No hay información registrada</span>
          </template>
        </v-data-table>
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
      serial: "",
      implement: "",
      mark: "",
      type: "",
      model: "",
      location: "",
      user: "",
      description: "",
      state: "",
      valid: true,
      serailRules: [v => !!v || "Serial del implemento es requerido"],
      implementRules: [v => !!v || "Nombre del implemento es requerido"],
      markRules: [v => !!v || "Marca del implemento es requerida"],
      typeRules: [v => !!v || "Tipo de implemento es requerido"],
      modelRules: [v => !!v || "Modelo del implemento es requerido"],
      locationRules: [v => !!v || "Ubicación del implemento es requerido"],
      userRules: [
        v => !!v || "Usuario responsable del implemento es requerido"
      ],
      stateRules: [v => !!v || "Estado del implemento es requerido"],
      headers: [
        { text: "SERIAL", align: "center", sortable: false, value: "serial" },
        { text: "IMPLEMENTO", align: "center", value: "name", sortable: false },
        { text: "MARCA", align: "center", value: "mark", sortable: false },
        { text: "TIPO", align: "center", value: "type" },
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
      items: []
    };
  },
  async created() {
    try {
      const res = await axios.get("implement");
      this.items = await res.data.implement;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    //Add New Salon
    async NewImplement(event) {
      const implement = await axios
        .post("newImplement", {
          serial: this.serial,
          name: this.implement,
          mark: this.mark,
          type: this.type,
          model: this.model,
          location: this.location,
          user: this.user,
          description: this.description,
          state: this.state
        })
        .then(implement => {
          this.$router.push({ name: "implementos" });
        })
        .catch(err => console.error(err));
    },
    //Delete Salon
    deleteImplement(id) {
      const response = confirm("Esta seguro de eliminar este implemento?");
      if (response) {
        axios
          .delete("deleteImplement/" + id)
          .then(res => {
            this.items.splice(id, 1);
            console.log("Implement Delete: ", id);
          })
          .catch(e => {
            console.log("Unable to clear the implement", e);
          });
      }
      return;
    }
  }
};
</script>