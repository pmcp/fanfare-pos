<template>
  <div class="page-wrapper">
    <pos-clients-create></pos-clients-create>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import posClientsCreate from '@/components/pos/ClientsCreate.vue'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  components: { posClientsCreate },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped></style>
