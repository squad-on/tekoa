<template>
  <div>
    <Breadcrumb active="Minhas conexões" />
    <MatchList :matches="connections" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      connections: []
    }
  },
  async created () {
    this.connections = await this.$axios.$get('/api/conversations/connected_users')
  }
}
</script>
