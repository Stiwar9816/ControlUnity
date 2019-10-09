<template>
  <v-layout>
    <v-flex class="mt-1">
      <v-card max-width="400" class="mx-auto elevation-3" outlined>
        <v-img height="140" src="/logo.png" class="header_login"></v-img>
        <v-form v-on:submit.prevent="registro" ref="form" v-model="valid" lazy-validation>
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
              :append-icon="show1 ? 'icon-eye' : 'icon-eye-slash'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              label="Contraseña"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              rounded
              block
              class="accent"
              type="submit"
              :disabled="!valid"
              @click.prevent="registro"
            >Iniciar Sesión</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "~/plugins/axios";

export default {
  data() {
    return {
      cc: "",
      name: "",
      email: "",
      password: "",
      valid: true,
      show1: false,
      ccRules: [v => !!v || "Cedula de ciudadania es requerida"],
      nameRules: [v => !!v || "Nombre de usuario es requerido"],
      emailRules: [
        v => !!v || "Correo electronico es requerido ",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Correo electronico no es valido, Verifiquelo nuevamente"
      ],
      passRules: [
        v => !!v || "Contraseña es requerida ",
        V1 => V1.length >= 6 || "Minimo 6 Digitos*"
      ]
    };
  },
  methods: {
    async registro() {
      await axios
        .post("register", {
          cc: this.cc,
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$router.replace("/");
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
    
