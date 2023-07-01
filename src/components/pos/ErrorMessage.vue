<template>
  <v-banner
    color="red"
    dark
    elevation="1"
    rounded
    shaped
    tile
  >
    <slot></slot>
  </v-banner>
</template>

<script>
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('orders', ['activeOrder']),
    // ...mapGetters('orders', ['readableOrder'])
  },

}
</script>
