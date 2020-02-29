<template>
  <div>
    {{ activeOrder.total }}
    <pos-order-item
      v-for="product in filteredProducts(activeProductType)"
      :key="product.id"
      :product="product"
    ></pos-order-item>
    <v-bottom-navigation v-model="activeProductType" absolute horizontal grow>
      <v-btn
        v-for="(type, key) in productTypes"
        :key="`type-${key}`"
        :value="type"
        @click="activeProductType = key"
      >
        <span>{{ type }} - {{ activeOrder.totals[type] }}</span>
        <!-- <v-icon>mdi-history</v-icon> -->
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import PosOrderItem from '@/components/pos/OrderItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PosOrderItem
  },
  data() {
    return {
      activeProductType: 'drank'
    }
  },
  computed: {
    ...mapGetters('products', ['filteredProducts']),
    ...mapState('products', [
      'products',
      'productTypes',
      'productsLoading',
    ]),
    ...mapState('orders', ['activeOrder'])
    // ...mapState('app', ['networkOnLine'])
  },
  mounted() {
    this.getProducts({ active: true })
  },
  methods: {
    ...mapActions('products', ['getProducts'])
  }
}
</script>
