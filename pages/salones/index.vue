<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">SALONES REGISTRADOS</v-subheader>
      <v-container>
        <v-form ref="form" v-model="valid" v-on:submit="newRoom" lazy-validation>
          <v-row>
            <!-- inputs -->
            <v-col>
              <v-text-field v-model="name" :rules="salonRules" label="Nombre Salon" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="location" :rules="locationRules" label="Ubicación" required></v-text-field>
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
              <v-btn
                rounded
                color="primary black--text"
                type="submit"
                :disabled="!valid"
                @click="NewRoom"
              >
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

        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :sort-by="['name']"
          :sort-desc="[false]"
          :search="search"
          class="elevation-1"
        >
          <template slot="items" slot-scope="data" />
          <template v-slot:item.icon>
            <v-btn icon aria-label="edit">
              <v-icon small color="edit">icon-pencil</v-icon>
            </v-btn>
            <v-btn icon aria-label="delete">
              <v-icon small color="error">icon-trash</v-icon>
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
      name: "",
      location: "",
      capacity: "",
      description: "",
      valid: true,
      salonRules: [v => !!v || "Nombre del salon es requerido"],
      capacityRules: [v => !!v || "Capacidad del salon es requerida"],
      locationRules: [v => !!v || "Capacidad del salon es requerida"],
      descriptionRules: [v => !!v || "Descripción del salon es requerida"],
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
      items: []
    };
  },
  async created() {
    try {
      const res = await axios.get("room");
      this.items = await res.data.Rooms;
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
    async NewRoom() {
      await axios
        .post("newRoom", {
          name: this.name,
          location: this.location,
          capacity: this.capacity,
          description: this.description
        })
        .then(res => {
          this.$router.push({ name: "salones" });
        })
        .catch(err => console.error(err));
    }
  }
};
</script>