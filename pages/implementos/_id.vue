<template slot="items" slot-scope="data">
  <v-btn icon v-on:click="deleteImplement(data.item._id)" aria-label="delete">
    <v-icon small color="error">fa fa-trash</v-icon>
  </v-btn>
</template>

<script>
import axios from "axios";
export default {
  layout: "home",
  data() {
    return {
      items: [],
      id: this.$route.params.id
    };
  },
  methods: {
    //Delete Salon
    deleteImplement(id) {
      const response = confirm("Esta seguro de eliminar este implemento?");
      if (response) {
        axios
          .delete("http://localhost:3000/deleteImplement/" + id)
          .then(res => {
            this.items.splice(id, 1);
            console.log("Implement Delete: ", id);
          })
          .catch(e => {
            console.log("Unable to clear the boat", e);
          });
      }
      return;
    }
  }
};
</script>
