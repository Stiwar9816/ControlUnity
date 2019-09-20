<template>
  <v-layout>
    <v-flex>
      <h3 class="title mt-3">IMPLEMENTOS REGISTRADOS</h3>
      <v-container>
        <v-form>
          <v-row cols="12" xs="12" sm="12" md="3">
            <!-- inputs -->
            <v-col>
              <v-text-field label="Serial" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Implemento" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Stock" type="number" min="0" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Marca" required></v-text-field>
            </v-col>
            <v-col>
              <v-btn rounded color="primary">
                <v-icon dark>mdi-plus</v-icon>Agregar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- Tabla -->
        <v-row cols="12">
            <v-col md="4">
              <v-text-field v-model="search" class="mt-4 mb-5" label="Buscar implemento" hide-details></v-text-field>
            </v-col>
          </v-row>
             <v-data-table :headers="headers" :search="search"></v-data-table>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
        search:"",
        headers:[
            {text:"SERIAL", align:"center", sortable:false},
            {text:"IMPLEMENTO" ,align:"center"},
            {text:"STOCK",align:"center",sortable:false},
            {text:"MARCA",align:"center"},
            {text:"ACCIONES", align:"center", sortable:false}
        ]
    };
  }
};
</script>