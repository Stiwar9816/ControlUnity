<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">CONFIGURACIONES</v-subheader>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row cols="12" xs="12" sm="12" md="3">
            <v-col>
              <v-text-field v-model="name" :rules="nameRules" label="Nombre completo" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                label="Correo electronico"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                :rules="passRules"
                :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                counter
                label="Contraseña actual"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="passwordNew"
                :rules="passRules"
                :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                counter
                label="Nueva contraseña"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="passwordNewConf"
                :rules="passRules"
                :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                counter
                label="Confirmar nueva contraseña"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-btn
                rounded
                color="primary black--text"
                type="submit"
                :disabled="!valid"
                @click="validate"
              >
                <v-icon dark>fa fa-plus</v-icon>Guardar cambios
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      valid: true,
      show1: false,
      name: "",
      email: "",
      password: "",
      passwordNew: "",
      passwordNewConf: "",
      nameRules: [v => !!v || "El nombre es requerido"],
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
  mounted() {
    this.valid = false;
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