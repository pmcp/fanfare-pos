<template>
  <div>
    <pre>{{ notifications }}</pre>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('system', ['notifications'])
  },
  methods: {
    ...mapActions('system', ['getNotifications'])
  },
  mounted() {
    // Get the orders of this client
    this.getNotifications()
  },
}
</script>

<style lang="scss" scoped></style>
