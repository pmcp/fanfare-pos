<template>
  <div>
    <pos-clients-create></pos-clients-create>
    <pos-clients-list></pos-clients-list>
    <div style="height:20vh"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import posClientsCreate from '@/components/pos/ClientsCreate.vue'
import posClientsList from '@/components/pos/ClientsList.vue'

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
  components: { posClientsCreate, posClientsList },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
