<template>
  <v-layout>
    <v-flex class="mt-1">
      <v-card max-width="400" class="mx-auto" outlined>
        <v-img height="140" src="/logo.png" class="header_login"></v-img>
<<<<<<< HEAD
        <v-card-text>
          <form @submit.prevent="registro">   
            <v-text-field v-model="cc" label="C.C" type="number" min="0" required></v-text-field>
            <v-text-field v-model="name" label="Nombre completo" required></v-text-field>
            <v-text-field v-model="email" label="Correo electronico" type="email" required></v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
            <!-- <v-text-field
=======
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field v-model="cc" :rules="ccRules" label="C.C" type="number" min="0" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Nombre completo" required></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Correo electronico"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passRules"
              label="Contraseña"
              type="password"
              required
            ></v-text-field>
            <v-text-field
>>>>>>> aa615f183397165a9a6daae6c9323549a8a7237c
              v-model="confPassword"
              :rules="passRules"
              label="Confirmar contraseña"
              type="password"
              required
<<<<<<< HEAD
            ></v-text-field> -->
        <v-card-actions>
          <v-btn rounded block class="accent" type="submit">Iniciar Sesión</v-btn>
        </v-card-actions>
          </form>
        </v-card-text>
=======
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              rounded
              block
              class="accent"
              type="submit"
              :disabled="!valid"
              @click="validate"
              to="/"
            >Iniciar Sesión</v-btn>
          </v-card-actions>
        </v-form>
>>>>>>> aa615f183397165a9a6daae6c9323549a8a7237c
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
<<<<<<< HEAD
      // confPassword:""
=======
      confPassword: "",
      valid: true,
      ccRules: [v => !!v || "Cedula de ciudadania es requerida"],
      nameRules: [v => !!v || "Nombre de usuario es requerido"],
      emailRules: [
        v => !!v || "Correo electronico es requerido ",
        v =>
          /.+@.+/.test(v) ||
          "Correo electronico no es valido, Verifiquelo nuevamente"
      ],
      passRules: [
        v => !!v || "Contraseña es requerida ",
        V1 => V1.length >= 6 || "Minimo 6 Digitos*"
      ]
>>>>>>> aa615f183397165a9a6daae6c9323549a8a7237c
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
    
