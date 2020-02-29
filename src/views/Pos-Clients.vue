<template>
  <div>
    <pos-clients-create></pos-clients-create>
    <pos-clients-list></pos-clients-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import posClientsList from '@/components/pos/ClientsList'
import posClientsCreate from '@/components/pos/ClientsCreate'

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
  components: { posClientsList, posClientsCreate },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped></style>
