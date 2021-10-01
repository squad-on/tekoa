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
  layout: 'conta',
  data () {
    return {
      media: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Trilhas', to: '/conta/medias' },
        { text: 'Editar item', active: true }
      ]
    }
  },
  async created () {
    this.media = await this.$axios.$get('/api/medias/' + this.$route.params.id)
  }
}
</script>
