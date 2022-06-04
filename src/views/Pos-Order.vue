<template>
  <div>
    <!--    {{ correctOrder }}-->
    <!--    <div-->
    <!--      v-if="-->
    <!--        activeOrder.totals !== undefined && activeOrder.products !== undefined-->
    <!--      "-->
    <!--    >-->
    <!--    {{ activeOrder }}-->
    <!--    </div>-->

    <!-- TODO: MODULE HERE THAT INDICATES IF ORDER IS CORRECT vs INCORRECT-->
    <pos-orders-send></pos-orders-send>

      <pos-orders-create :client-id="activeOrder.user.id"></pos-orders-create>
    <!--    </div>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// eslint-disable-next-line import/extensions
import posOrdersCreate from '@/components/pos/OrdersCreate'
// eslint-disable-next-line import/extensions
import posOrdersSend from '@/components/pos/OrdersSend'

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
  components: { posOrdersCreate, posOrdersSend },
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
