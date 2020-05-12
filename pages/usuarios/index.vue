<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">USUARIOS REGISTRADOS </v-subheader>
      <v-container>
        <v-switch inset v-model="switch1" label="Mostrar Formulario"></v-switch>
        <!-- edit user -->
        <v-form
          v-on:submit="editUser(editUsers)"
          v-if="edit"
          ref="form"
          v-model="valid"
          v-show="switch1"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" sm="2" md="3">
              <v-text-field
                v-model="editUsers.cc"
                :rules="ccRules"
                autofocus
                label="C.C"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="3">
              <v-text-field
                v-model="editUsers.name"
                :rules="nameRules"
                label="Nombre completo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="3">
              <v-text-field
                v-model="editUsers.email"
                :rules="emailRules"
                label="Correo electronico"
                type="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="editUsers.role"
                :rules="roleRules"
                :items="roles"
                label="Cargo"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-btn
                rounded
                color="error black--text"
                class="mr-2"
                @click="edit = false"
              >
                <v-icon dark>mdi-cancel</v-icon>Cancelar
              </v-btn>
              <v-btn
                rounded
                color="success black--text"
                type="submit"
                :disabled="!valid"
              >
                <v-icon dark>mdi-checkbox-marked-circle-outline</v-icon>Editar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- edit user -->

        <!-- new user -->
        <v-form
          v-on:submit="registro()"
          v-if="!edit"
          v-show="switch1"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field
                v-model="cc"
                :rules="ccRules"
                autofocus
                label="C.C"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="3">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nombre completo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="3">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Correo electronico"
                type="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model="password"
                :rules="passRules"
                :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                label="Contraseña"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-select
                v-model="role"
                :rules="roleRules"
                :items="roles"
                label="Cargo"
              ></v-select>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn
              rounded
              class="primary  black--text"
              type="submit"
              :disabled="!valid"
              >Registrate</v-btn
            >
          </v-row>
        </v-form>
        <!-- End new user -->
        <!-- Tabla -->
        <v-row cols="12">
          <v-col md="4" sm="6">
            <v-text-field
              prepend-icon="mdi-magnify"
              v-model="search"
              class="mt-4 mb-5"
              label="Buscar usuarios"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template slot="items" slot-scope="data"></template>
          <template slot="item.icon" slot-scope="data">
            <v-btn icon v-on:click="onlyUser(data.item._id)" aria-label="edit">
              <v-icon small color="edit">mdi-circle-edit-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              v-on:click="deleteUser(data.item._id)"
              aria-label="delete"
            >
              <v-icon color="error" small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-results>
            <span class="font-weight-regular black--text"
              >No se encontraron coincidencias</span
            >
          </template>
          <template v-slot:no-data>
            <span class="font-weight-regular black--text"
              >No hay información registrada</span
            >
          </template>
        </v-data-table>
        <!-- Alerta -->
        <v-snackbar v-model="snackbar" :color="color">
          {{ text }}
        </v-snackbar>
        <!-- End Alerta -->
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'home',
  data() {
    return {
      search: '',
      edit: false,
      switch1: true,
      snackbar: false,
      text: '',
      color: '',
      cc: '',
      name: '',
      email: '',
      password: '',
      role: '',
      valid: true,
      show1: false,
      roles: ['Recepción', 'TIC', 'Planeación'],
      ccRules: [v => !!v || 'Cedula de ciudadania es requerida'],
      nameRules: [v => !!v || 'Nombre de usuario es requerido'],
      emailRules: [
        v => !!v || 'Correo electronico es requerido ',
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'Correo electronico no es valido, Verifiquelo nuevamente'
      ],
      passRules: [
        v => !!v || 'Contraseña es requerida ',
        V1 => V1.length >= 6 || 'Minimo 6 Digitos*'
      ],
      roleRules: [v => !!v || 'Ubicación del salon es requerido'],
      headers: [
        { text: 'CEDULA', align: 'center', sortable: false, value: 'cc' },
        {
          text: 'NOMBRE COMPLETO',
          align: 'center',
          value: 'name',
          sortable: false
        },
        {
          text: 'CARGO',
          align: 'center',
          value: 'role',
          sortable: false
        },
        {
          text: 'CORREO ELECTRONICO',
          align: 'center',
          sortable: false,
          value: 'email'
        },
        { text: 'ACCIONES', align: 'center', sortable: false, value: 'icon' }
      ],
      items: [],
      editUsers: {}
    }
  },
  async created() {
    try {
      // const token = sessionStorage.getItem("token");
      const res = await axios.get(
        `https://control-unity-api.herokuapp.com/api/user`
      )
      this.items = await res.data.users
    } catch (error) {
      this.snackbar = true
      this.text = error.response.statusText
      console.log(error)
    }
  },
  mounted() {
    this.valid = false
  },
  methods: {
    async registro() {
      await axios
        .post('https://control-unity-api.herokuapp.com/api/register', {
          cc: this.cc,
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        })
        .then(res => {
          this.$router.go()
        })
        .catch(err => {
          this.snackbar = true
          this.color = 'error'
          this.text = err.response.data.message
          console.log({ err })
        })
    },
    onlyUser(id) {
      this.edit = true
      console.log(id)
      axios
        .get(`https://control-unity-api.herokuapp.com/api/user/${id}`)
        .then(res => {
          this.editUsers = res.data
        })
        .catch(e => {
          this.snackbar = true
          this.color = 'error'
          this.text = e.message
          console.log(e)
        })
    },
    editUser(item) {
      axios
        .put(
          `https://control-unity-api.herokuapp.com/api/updateUser/${item._id}`,
          item
        )
        .then(res => {
          const index = this.items.findIndex(n => n._id === res.data._id)
          this.items[index].cc = res.data.cc
          this.items[index].name = res.data.name
          this.items[index].email = res.data.email
          this.items[index].role = res.data.role
          this.edit = false
          this.snackbar = true
          this.color = 'success'
          this.text = '¡Usuario Editado con exito!'
        })
    },
    //Delete User
    deleteUser(id) {
      const response = confirm('Esta seguro de eliminar este usuario?')
      if (response) {
        axios
          .delete(
            `https://control-unity-api.herokuapp.com/api/deleteUser/${id}`
          )
          .then(res => {
            console.log('User Delete: ', id)
            this.items.splice(id, 1)
            this.snackbar = true
            this.color = 'success'
            this.text = res.data.message
            this.$router.go()
          })
          .catch(e => {
            this.snackbar = true
            this.color = 'error'
            this.text = e.response.data.message
            console.log('Unable to clear the user', { e })
          })
      }
      return
    }
  }
}
</script>
