<template>
  <div>
    <v-card class="mx-auto">
      <v-list two-line>
        <div v-if="totals">
          <v-data-table
            :options="options"
            :headers="totals.headers"
            :items="totals.items"
            :items-per-page="5"
            :search="search"
            class="elevation-1"
            multi-sort
            :fixed-header="true"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Zoeken"
                class="mx-4"
              ></v-text-field>
            </template>
          </v-data-table>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
// import ProductItem from '@/components/ProductItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      options: {
        itemsPerPage: 100,
      }
    }
  },
  computed: {
    ...mapGetters('clients', ['isProductDeletionPending']),
    ...mapGetters('orders', ['totals']),
    ...mapState('clients', ['clients', 'ordersLoading']),
    ...mapState('orders', ['allOrders']),
    ...mapState('app', ['networkOnLine'])
  },
  mounted() {
    this.getAllOrders()
  },

  methods: {
    ...mapActions('orders', ['getAllOrders'])
  }
}
</script>
