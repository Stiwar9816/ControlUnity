<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">IMPLEMENTOS REGISTRADOS</v-subheader>
      <v-container>
        <v-form ref="form" v-model="valid" v-on:submit="NewImplement" lazy-validation>
          <v-row>
            <!-- inputs -->
            <v-col>
              <v-text-field v-model="serial" :rules="serialRules" label="Serial" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="implement" :rules="implementRules" label="Implemento" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="stock"
                :rules="stockRules"
                label="Stock"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="mark" :rules="markRules" label="Marca" required></v-text-field>
            </v-col>
            <v-col>
              <v-textarea
                v-model="description"
                :rules="descriptionRules"
                required
                rows="1"
                label="Descripción"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-btn rounded color="primary" type="submit" :disabled="!valid" @click="NewImplement">
                <v-icon dark>icon-plus</v-icon>Agregar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- Tabla -->
        <v-row cols="12">
          <v-col md="4">
            <v-text-field
              prepend-icon="icon-search"
              v-model="search"
              class="mt-1 mb-5"
              label="Buscar implemento"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template slot="[serial]" slot-scope="data">{{data.item.serial}}</template>
          <template slot="[name]" slot-scope="data">{{data.item.name}}</template>
          <template slot="[stock]" slot-scope="data">{{data.item.stock}}</template>
          <template slot="[mark]" slot-scope="data">{{data.item.mark}}</template>
          <template v-slot-scope="data" v-slot:item.icon="{ items }">
            <v-btn icon>
              <v-icon small color="edit">icon-pencil</v-icon>
            </v-btn>
            <v-btn icon v-on:click="deleteImplement(data.item._id)">
              <v-icon small color="error">icon-trash</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "~/plugins/axios";
// import { async } from "q";
export default {
  layout: "home",
  data() {
    return {
      search: "",
      serial: "",
      implement: "",
      stock: "",
      mark: "",
      description: "",
      valid: true,
      serialRules: [v => !!v || "Serial del implemento es requerido"],
      implementRules: [v => !!v || "Nombre del implemento es requerido"],
      stockRules: [v => !!v || "Stock del implemento es requerido"],
      markRules: [v => !!v || "Marca del implemento es requerido"],
      descriptionRules: [v => !!v || "Descripción del salon es requerida"],
      headers: [
        { text: "SERIAL", align: "center", sortable: false, value: "serial" },
        { text: "IMPLEMENTO", align: "center", value: "name" },
        { text: "STOCK", align: "center", sortable: false, value: "stock" },
        { text: "MARCA", align: "center", value: "mark" },
        {
          text: "DESCRIPCIÓN",
          align: "center",
          sortable: false,
          value: "description"
        },
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
    async NewImplement() {
     const implement =  await axios
        .post('newImplement', {
          serial: this.serial,
          name: this.implement,
          stock: this.stock,
          mark: this.mark,
          description: this.description
        })
        .then(implement => {
          this.$router.push({ name: "implementos" });
        })
        .catch(err => console.error(err));
    },
    deleteImplement(id) {
      const response = confirm("Esta seguro de eliminar este implemento?");
      if (response) {
        const eliminar = axios
          .delete("deleteImplement/" + id)
          .then(res => {
            this.items.splice(eliminar, 1);
            console.log("Implement Delete: ", eliminar);
          })
          .catch(e => {
            console.log("Unable to clear the boat", e);
          });
      }
      return;
    }
  }
};
</script>