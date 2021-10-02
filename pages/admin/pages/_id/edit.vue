<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <PageForm v-if="page" :page="page" />
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
      page: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Páginas', to: '/admin/pages' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.page = await this.$axios.$get('/api/pages/' + this.$route.params.id)
  }
}
</script>
