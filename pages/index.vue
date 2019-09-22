<template>
  <v-layout>
    <v-flex class="mt-4">
      <v-card max-width="400" class="mx-auto login" outlined>
        <v-img height="140" src="/logo.png" class="header_login"></v-img>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field v-model="cc" :rules="ccRules" label="C.C" type="number" min="0" required></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="CONTRASEÑA"
              type="password"
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
              @click="validate"
            >Iniciar Sesión</v-btn>
          </v-card-actions>
        </v-form>
        <v-card-text class="text-center">
          <n-link to="/registro">¿No tiene una cuenta? - ¡Registrate Aqui!</n-link>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  // layout:"",
  data() {
    return {
      cc: "",
      password: "",
      valid: true,
      ccRules: [v => !!v || "Cedula de ciudadania es requerida"],
      passwordRules: [v => !!v || "Contraseña es requerida"]
    };
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

<style scoped>
.header_login {
  background-color: rgb(190, 189, 189);
}
a {
  color: #000;
  font-size: 16px;
  text-decoration: none;
}
a:hover {
  color: gold;
}
.login {
  margin-left: 420px;
  margin-top: 100px;
}
</style>>
    
