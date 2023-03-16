<template>
  <div>
    <h1>Tafel: {{ activeOrder.user.table }}</h1>
    <slot/>
    <div style="padding-top: 2rem;">
      <v-btn v-if="activeOrder.total === 0" color="orange" disabled block @click="sendOrder">
        Verstuur
      </v-btn>
      <v-btn v-else color="orange" block @click="sendOrder">
        Verstuur
      </v-btn>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    overlay: false,
    newClient: {}
  }),
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('orders', ['activeOrder']),
    // ...mapGetters('orders', ['readableOrder'])
  },
  methods: {
    ...mapActions('orders', ['createOrder']),
    closeForm() {
      this.overlay = false
    },
    sendOrder() {
      this.createOrder()
      this.overlay = false
    },
    // orderProducts(products){
    //   const array = Object.values(products);
    //   const filtered = array.filter(x => x.value !== 0)
    //   const sorted = filtered.sort((a, b) => (a.order*1 > b.order*1) ? 1 : -1)
    //   console.log(sorted)
    //   return sorted
    // }
  }
}
</script>
