<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">SALONES REGISTRADOS</v-subheader>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <!-- inputs -->
            <v-col>
              <v-text-field v-model="salon" :rules="salonRules" label="Nombre Salon" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="capacity"
                :rules="capacityRules"
                label="Capcidad"
                type="number"
                min="0"
                required
              ></v-text-field>
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
              <v-btn rounded color="primary" type="submit" :disabled="!valid" @click="validate">
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
              class="mb-5"
              label="Buscar Salon"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.icon="{ item }">
            <v-icon small color="edit" class="mr-2">icon-pencil</v-icon>
            <v-icon small color="error">icon-trash</v-icon>
          </template>
        </v-data-table>
      </v-container>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from '~/plugins/axios'
export default {
  layout: "home",
  data() {
    return {
      search: "",
      salon: "",
      capacity: "",
      description: "",
      valid: true,
      salonRules: [v => !!v || "Nombre del salon es requerido"],
      capacityRules: [v => !!v || "Capacidad del salon es requerida"],
      descriptionRules: [v => !!v || "Descripción del salon es requerida"],
      headers: [
        { text: "NOMBRE SALON", align: "center", value: "name_salon" },
        { text: "CAPACIDAD", align: "center", value: "fat" },
        { text: "DESCRIPCIÓN", align: "center", value: "carbs" },
        { text: "ACCIONES", align: "center", value: "icon" }
      ],
      items: []
    };
  },
  async created(){
    try {
      const res = await axios.get("/api/room");
      console.log(res.data);
      this.items = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>