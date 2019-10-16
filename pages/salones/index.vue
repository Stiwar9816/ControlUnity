<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">SALONES REGISTRADOS</v-subheader>
      <v-container>
        <v-form ref="form" v-model="valid" v-on:submit="NewRoom" lazy-validation>
          <v-row>
            <!-- inputs -->
            <v-col sm="4" md="3">
              <v-text-field v-model="room.name" :rules="salonRules" label="Nombre Salon" required></v-text-field>
            </v-col>
            <v-col sm="4" md="2">
              <v-text-field v-model="room.location" :rules="locationRules" label="Ubicación" required></v-text-field>
            </v-col>
            <v-col sm="4" md="2">
              <v-text-field
                v-model="room.capacity"
                :rules="capacityRules"
                label="Capcidad"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="5">
              <v-textarea
                v-model="room.description"
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
                color="primary black--text"
                type="submit"
                :disabled="!valid"
                @click="NewRoom"
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
          <template slot="item.icon" slot-scope="data">
            <v-btn icon aria-label="edit">
              <v-icon small color="edit">fa fa-pencil</v-icon>
            </v-btn>
            <v-btn icon v-on:click="deleteRoom(data.item._id)" aria-label="delete">
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
      // name: "",
      // location: "",
      // capacity: "",
      // description: "",
      valid: true,
      salonRules: [v => !!v || "Nombre del salon es requerido"],
      capacityRules: [v => !!v || "Capacidad del salon es requerida"],
      locationRules: [v => !!v || "Ubicación del salon es requerido"],
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
      items: [],
      room:{
        name:"",
        location:"",
        capacity:"",
        description:""
      }
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
    //New Salon
    async NewRoom() {
      await axios
        .post("newRoom", {
          name: this.room.name,
          location: this.room.location,
          capacity: this.room.capacity,
          description: this.room.description
        })
        .then(res => {
          this.$router.push({ name: "salones" });
        })
        .catch(err => console.error(err));
    },
    //Delete Salon
    deleteRoom(id) {
      const response = confirm("Esta seguro de eliminar este salon?");
      if (response) {
        axios
          .delete("deleteRoom/" + id)
          .then(res => {
            this.items.splice(id, 1);
            console.log("Room Delete: ", id);
          })
          .catch(e => {
            console.log("Unable to clear the room", e);
          });
      }
      return;
    }
  }
};
</script>