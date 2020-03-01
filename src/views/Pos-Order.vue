<template>
  <div>
    <pos-orders-send></pos-orders-send>
    <pos-orders-create client-id="clientId"></pos-orders-create>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import posOrdersCreate from '@/components/pos/OrdersCreate'
import posOrdersSend from '@/components/pos/OrdersSend'

export default {
  head() {
    return {
      title: {
        inner: 'Orders'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle}: Orders`,
          id: 'desc'
        }
      ]
    }
  },
  components: { posOrdersCreate, posOrdersSend },
  props: {
    clientId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      orderId: null
    }
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped></style>
