<template>
  <v-layout>
    <v-flex class="mt-1">
      <v-card max-width="400" class="mx-auto" outlined>
        <v-img height="140" src="/logo.png" class="header_login"></v-img>
        <v-card-text>
          <form>
            <v-text-field v-model="cc" label="C.C" type="number" min="0" required></v-text-field>
            <v-text-field v-model="name" label="Nombre completo" required></v-text-field>
            <v-text-field v-model="email" label="Correo electronico" type="email" required></v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
            <v-text-field
              v-model="confPassword"
              label="Confirmar contraseña"
              type="password"
              required
            ></v-text-field>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded block class="secondary" type="submit" to="/">Iniciar Sesión</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  data() {
    return {
      cc: "",
      name: "",
      email: "",
      password: "",
      confPassword:""
    };
  }
};
</script>

<style scoped>
.header_login {
  background-color: rgb(190, 189, 189);
}
</style>>
    
