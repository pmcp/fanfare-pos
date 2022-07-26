<template>
  <div>
    <pos-orders-create :client-id="activeOrder.user.id"></pos-orders-create>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// eslint-disable-next-line import/extensions
import posOrdersCreate from '@/components/pos/OrdersCreate'


export default {
  head() {
    return {
      title: {
        inner: 'Orders',
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle}: Orders`,
          id: 'desc',
        },
      ],
    }
  },
  components: { posOrdersCreate },
  data() {
    return {
      orderId: null,
    }
  },
  computed: {
    ...mapState('app', ['appTitle']),
    ...mapState('orders', ['activeOrder']),
    ...mapState('products', ['products']),
    ...mapGetters('orders', ['correctOrder']),
  }
}
</script>

<style lang="scss" scoped></style>
