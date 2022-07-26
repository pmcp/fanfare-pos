<template>
  <v-container fill-height fluid class="h-full">
    <v-layout justify-center  row fill-height>
      <v-text-field
        v-model="newClient.table"
        label="Tafel"
        color="black"
        @keydown.enter="add(newClient)"
      ></v-text-field>

      <v-bottom-navigation fixed horizontal grow>
        <v-btn color="green"  block @click="add(newClient)">
          Start
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-container>
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
      // Move to order form

    },
    add(client) {
      if(this.newClient.table === '') return;
      this.createClient(client)
      // Go to order form
      // http://localhost:8081/clients/O2yyNnTjmIwQRoAkOkFD/order


      this.closeForm()
    }
  }
}
</script>
