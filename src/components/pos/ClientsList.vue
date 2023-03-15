<template>
  <div v-if="clients">

    <v-card class="mx-auto">
      <v-list two-line>
        <v-list-item
          v-for="client in clients"
          :key="client.id"
        >
          <v-list-item-content>
            <v-list-item-title v-text="client.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="`${client.table}`"
            ></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div>
              <v-btn color="info" class="mx-2" @click="viewAllOrders(client)">Afrekening</v-btn>
              <v-btn color="warning" @click="createNewOrder(client)">Bestel</v-btn>
            </div>
<!--            <v-btn icon>-->
<!--              <v-icon color="grey lighten-1">Bestel</v-icon>-->
<!--            </v-btn>-->
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
// import ProductItem from '@/components/ProductItem'
import { mapState, mapActions, mapGetters } from 'vuex'
// eslint-disable-next-line import/extensions
import router from '@/router'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('clients', ['isProductDeletionPending']),
    ...mapState('clients', ['clients', 'loading']),
    ...mapState('app', ['networkOnLine']),
  },
  mounted() {
    // Get all the active clients

    this.getClients({ active: true, date: new Date() })
    // this.getClients({ active: true, date: false })
  },

  methods: {
    ...mapActions('clients', ['getClients', '']),
    ...mapActions('orders', ['setActiveOrderForClient']),
    createNewOrder(client) {
      this.setActiveOrderForClient(client)
      console.log(client)
      router.push({ path: `clients/${client.id}/order` })
    },
    viewAllOrders(client) {
      // this.setActiveOrderForClient(client)
      router.push({ path: `clients/${client.id}/` })
    },
  }
}
</script>
