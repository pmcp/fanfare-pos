<template>
  <div>
    <!--    <template v-if="activeOrder.totals !== undefined && ">-->
    <template v-if="activeOrder.totals !== undefined">
      <div v-if="activeProductType === 'overview'">
        <pos-orders-send>
          <div>
            <pos-order-item
              v-for="product in selectedProducts"
              :key="product.id"
              :product="product"
            ></pos-order-item>
          </div>
        </pos-orders-send>
      </div>

      <div v-else >
        <pos-order-item
          v-for="product in filteredProducts(activeProductType)"
          :key="product.id"
          :product="product"
        ></pos-order-item>
      </div>
      <div style="height:100px"></div>
      <v-bottom-navigation v-model="activeProductType" fixed horizontal grow>
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
        <v-btn color="green" value="overview">
          <v-badge v-if="activeOrder.total" :content="activeOrder.total">
            Totaal
          </v-badge>
          <span v-else>
            Totaal
          </span>
        </v-btn>
      </v-bottom-navigation>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// eslint-disable-next-line import/extensions
import PosOrderItem from '@/components/pos/OrderItem'
// eslint-disable-next-line import/extensions
import posOrdersSend from '@/components/pos/OrdersSend'

export default {
  components: {
    PosOrderItem, posOrdersSend

  },
  data() {
    return {
      activeProductType: 'drank'
    }
  },
  computed: {
    ...mapGetters('products', ['filteredProducts', 'selectedProducts']),
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
