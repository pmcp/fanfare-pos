<template>
  <div class="text-center">
    <v-btn color="error" @click="overlay = !overlay">
      Voeg klant toe
    </v-btn>

    <v-overlay :value="overlay">
      <v-card class="mx-auto">
        <v-card-title>Nieuwe Klant</v-card-title>

        <v-card-text class="text--primary" :loading="clientsLoading">
          <v-form ref="form">
            <v-text-field
              v-model="newClient.name"
              label="Naam"
              required
            ></v-text-field>

            <v-text-field
              v-model="newClient.table"
              label="Tafel"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text @click="closeForm">
            Annuleer
          </v-btn>

          <v-btn color="orange" text @click="add(newClient)">
            Voeg toe
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  data: () => ({
    overlay: false,
    newClient: {}
  }),
  computed: {
    ...mapState('clients', ['defaultClient', 'clientsLoading']),
    ...mapState('app', ['networkOnLine'])
  },
  mounted() {
    this.resetItem()
  },
  methods: {
    ...mapActions('clients', ['createClient']),
    resetItem() {
      this.newClient = cloneDeep(this.defaultClient)
    },
    closeForm() {
      this.overlay = false
      this.resetItem()
    },
    add(client) {
      /* TODO: Should go to store */
      this.createClient(client)
      this.closeForm()
    }
  }
}
</script>
