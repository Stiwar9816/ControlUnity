<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-subheader class="subtitle-1">MALLA CURRICULAR</v-subheader> <br />
        <inputMalla />
        <!-- end -->
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import inputMalla from "~/components/AddMalla";
export default {
  layout: "home",
  components: {
    inputMalla
  }
};
</script>
