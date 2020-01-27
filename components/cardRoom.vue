<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="(n,i) in salones"
          :key="i"
          cols="12"
          md="4"
        >
          <v-item v-slot:default="{ active, toggle }" >
            <v-card
              :color="active ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="200"
              @click="toggle"
              
            >
              <v-scroll-y-transition>
                <div
                  v-if="active"
                  class="display-3 flex-grow-1 text-center"
                  v-for=" (item,i) in salones" :key="i"
                >
            {{item.room}}
                  
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  data() {
    return {
      salones: [
        { room: "101", status: false },
        { room: "102", status: false },
        { room: "103", status: true },
        { room: "104", status: true },
        { room: "105", status: true },
      ]
    };
  }
};
</script>

<style>
#cards {
}

.theme--dark.v-card {
  background-color: #22ca84;
  color: #1b1b1b;
}
.li {
  text-decoration: none;
}
</style>
