<template>
  <div v-if="clients">
    <v-card max-width="600" class="mx-auto">
      <v-list two-line>
        <v-list-item
          v-for="client in clients"
          :key="client.id"
          @click="createNewOrder(client)"
        >
          <v-list-item-avatar>
            <v-icon v-text="client.table"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="client.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="`Client id ${client.id}`"
            ></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
            </v-btn>
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
    this.getClients({ active: true })
  },

  methods: {
    ...mapActions('clients', ['getClients', '']),
    ...mapActions('orders', ['setActiveOrderForClient']),
    createNewOrder(client) {
      this.setActiveOrderForClient(client)
      router.push({ path: `clients/${client.id}/order` })
    },
  }
}
</script>
