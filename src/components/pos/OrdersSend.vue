<template>
  <div class="text-center">
    <v-btn color="error" @click="overlay = !overlay">
      Bekijk bestelling
    </v-btn>

    <v-overlay :value="overlay">
      <v-card class="mx-auto">
        <v-card-title>Bestelling</v-card-title>

        <v-card-text class="text--primary" >
          {{ activeOrder }}
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text @click="closeForm">
            Annuleer
          </v-btn>

          <v-btn color="orange" text @click="sendOrder">
            Vestuur
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'


export default {
  data: () => ({
    overlay: false,
    newClient: {}
  }),
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('orders', ['activeOrder'])
  },
  methods: {
    ...mapActions('orders', ['createOrder']),
    closeForm() {
      this.overlay = false
    },
    sendOrder(){
      this.createOrder()
      this.overlay = false

    }

  }
}
</script>
