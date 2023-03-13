<template>
  <div>
<!--    {{ combinedOrders }}-->
    <div v-if="combinedOrders">
      <div v-for="(product, key) in combinedOrders.products.afrekening">
        <div v-if="product.value > 0 ">
          <v-container fluid class="pa-4">
            <v-layout row>
              <div class="item">
                <div class="item_text" style="margin-top:6px;">
                  <div class="item_textContainer">
                    <span class="body-1" >{{ product.name }}</span>
                  </div>
                </div>
                <span class="font-weight-black text-center" style="padding-left:20px;padding-top: 6px;padding-right:20px; ">{{ product.value }}</span>
              </div>
            </v-layout>
          </v-container>
        </div>
      </div>
      <v-btn color="orange" block @click="printTotalOrder(combinedOrders)">
        Print afrekening
      </v-btn>
    </div>



  </div>
</template>


<script>

import { mapState, mapActions, mapGetters } from 'vuex'
// eslint-disable-next-line import/extensions
import router from '@/router'



export default {

  data() {
    return {}
  },
  computed: {
    ...mapGetters('orders', ['combinedOrders']),

  },
  mounted() {
    // Get the orders of this client
    this.getClientOrders({ client: this.$route.params.clientId })

  },

  methods: {
    // ...mapActions('clients', ['getClientOrders']),
    ...mapActions('orders', ['getClientOrders', 'printTotalOrder'])
  }
}
</script>

<style scoped>
.item {
  display: flex;
  width: 100%;

}

.item_text {
  min-width: 50%;
  flex-grow: 1;
}

.item_textContainer {
  white-space:nowrap;
  overflow-x: auto;
}
</style>
