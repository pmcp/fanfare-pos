<template>
  <div>
    <v-card max-width="600" class="mx-auto">
      <v-list two-line>
        <v-list-item
          v-for="client in orders"
          :key="client.id"
          @click="getOrders({ clientId: client.id, active: true })"
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

export default {
  props: {
    clientId: {
      type: String,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('clients', ['isProductDeletionPending']),
    ...mapState('clients', ['clients', 'ordersLoading']),
    ...mapState('orders', ['orders']),
    ...mapState('app', ['networkOnLine'])
  },
  mounted() {
    this.getOrders({ clientId: this.clientId, active: true })
  },

  methods: {
    ...mapActions('orders', ['getOrders'])
  }
}
</script>
