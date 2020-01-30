<template>
  <div>
    <admin-products-list></admin-products-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adminProductsList from '@/components/admin/ProductsList'

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
  components: { adminProductsList },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped></style>
