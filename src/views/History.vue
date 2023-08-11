<template>
  <div>
    <div v-for="n in notifications" :key="n.id">
      {{ n }}
    </div>
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
    this.getNotifications()
  },
}
</script>

<style lang="scss" scoped></style>
