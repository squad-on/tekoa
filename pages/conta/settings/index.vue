<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <SettingsForm v-if="settings" :settings="settings" />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      settings: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Configurações', active: true }
      ]
    }
  },
  async created() {
    this.settings = await this.$axios.$get('/api/settings')
  }
}
</script>
