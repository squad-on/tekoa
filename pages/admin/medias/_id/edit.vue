<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <MediaForm v-if="media" :media="media" />
    <div v-else class="text-center">
      <v-progress-circular indeterminate small label="Carregando..." />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      media: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Trilhas', to: '/admin/medias' },
        { text: 'Editar item', active: true }
      ]
    }
  },
  async created () {
    this.media = await this.$axios.$get('/api/medias/' + this.$route.params.id)
  }
}
</script>
