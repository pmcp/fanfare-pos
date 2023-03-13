<template>
  <div>
    <pos-client-orders></pos-client-orders>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// eslint-disable-next-line import/extensions
import posClientOrders from '@/components/pos/ClientOrders'

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
  components: { posClientOrders },
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
