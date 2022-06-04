<template>
  <div>
    <!--    <template v-if="activeOrder.totals !== undefined && ">-->
    <template v-if="activeOrder.totals !== undefined">
      <!--      <pre>-->
      <!--        {{ activeOrder }}-->
      <!--      </pre>-->
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
        >
          <v-badge v-if="activeOrder.totals[type]" :content="activeOrder.totals[type]">
            {{ type }}
          </v-badge>
          <span v-else>
            {{ type }}
          </span>
          <!-- <v-icon>mdi-history</v-icon> -->
        </v-btn>

      </v-bottom-navigation>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// eslint-disable-next-line import/extensions
import PosOrderItem from '@/components/pos/OrderItem'

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
  // mounted() {
  //   this.getProducts({ active: true })
  // },
  // methods: {
  //   ...mapActions('products', ['getProducts'])
  // }
}
</script>
