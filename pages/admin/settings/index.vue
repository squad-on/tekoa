<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <SettingsForm v-if="settings" :settings="settings" />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      settings: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Configurações', active: true }
      ]
    }
  },
  async created() {
    this.settings = await this.$axios.$get('/api/settings')
  }
}
</script>
