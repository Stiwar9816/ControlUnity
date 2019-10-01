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
          <template slot="[description]" slot-scope="data">{{data.item.description}}</template>
          <template v-slot:item.icon="{ items }">
            <v-icon small color="edit" class="mr-2">icon-pencil</v-icon>
            <v-icon small color="error">icon-trash</v-icon>
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
      await axios
        .post("newImplement", {
          serial: this.serial,
          name: this.implement,
          stock: this.stock,
          mark: this.mark,
          description: this.description
        })
        .then(res => {
          this.$router.push({ name: "implementos" });
        })
        .catch(err => console.error(err));
    }
  }
};
</script>