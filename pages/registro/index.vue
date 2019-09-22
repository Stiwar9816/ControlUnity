<template>
  <v-layout>
    <v-flex class="mt-1">
      <v-card max-width="400" class="mx-auto" outlined>
        <v-img height="140" src="/logo.png" class="header_login"></v-img>
        <v-card-text>
          <form @submit.prevent="registro">   
            <v-text-field v-model="cc" label="C.C" type="number" min="0" required></v-text-field>
            <v-text-field v-model="name" label="Nombre completo" required></v-text-field>
            <v-text-field v-model="email" label="Correo electronico" type="email" required></v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
            <!-- <v-text-field
              v-model="confPassword"
              label="Confirmar contraseña"
              type="password"
              required
            ></v-text-field> -->
        <v-card-actions>
          <v-btn rounded block class="accent" type="submit">Iniciar Sesión</v-btn>
        </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from '~/plugins/axios'

export default {
  data() {
    return {
      cc: "",
      name: "",
      email: "",
      password: "",
      // confPassword:""
    };
  },
 methods: {
    async registro() {
     await axios
        .post("http://localhost:3000/api/registro", {
          cc: this.cc,
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          redirect('/')
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.header_login {
  background-color: rgb(190, 189, 189);
}
</style>>
    
