<template>
  <v-layout>
    <v-flex>
      <h3 class="title mt-3">SALONES REGISTRADOS</h3>
      <v-form>
        <v-container>
          <v-row cols="12" xs="12" sm="12" md="3">
            <!-- inputs -->
            <v-col>
              <v-text-field label="Nombre Salon" required outlined></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Capcidad" type="number" min="0" required outlined></v-text-field>
            </v-col>
            <v-col>
              <v-textarea outlined required rows="1" label="Descripción"></v-textarea>
            </v-col>
            <v-col>
              <v-btn rounded color="primary">
                <v-icon dark>mdi-plus</v-icon>Agregar
              </v-btn>
            </v-col>
          </v-row>
          <!-- Tabla -->
          <v-row cols="12">
            <v-col md="4">
              <v-text-field
                v-model="search"
                class="mb-5"
                label="Buscar Salon"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-data-table :headers="headers" :items="items" :search="search"></v-data-table>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  layout:"home",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "id"
        },
        { text: "NOMBRE SALON", align: "center", value: "name_salon" },
        { text: "CAPACIDAD", align: "center", value: "fat" },
        { text: "DESCRIPCIÓN", align: "center", value: "carbs" },
        { text: "ACCIONES", align: "center", value: "icon" }
      ],
      items: [
        {
          name_salon: "Frozen Yogurt",
          id: 159,
          fat: 6.0,
          carbs: 24,
          icon: "mdi-folder"
        },
        {
          name_salon: "Ice cream sandwich",
          id: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name_salon: "Eclair",
          id: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name_salon: "Cupcake",
          id: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name_salon: "Gingerbread",
          id: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name_salon: "Jelly bean",
          id: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name_salon: "Lollipop",
          id: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name_salon: "Honeycomb",
          id: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name_salon: "Donut",
          id: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name_salon: "KitKat",
          id: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    };
  }
};
</script>