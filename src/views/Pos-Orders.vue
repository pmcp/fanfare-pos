<template>
  <div>
    <pos-orders-list :client-id="clientId"></pos-orders-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import posOrdersList from '@/components/pos/OrdersList'

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
  components: { posOrdersList },
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
