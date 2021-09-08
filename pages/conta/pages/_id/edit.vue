<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="page" :page="page" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      page: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Páginas', to: '/conta/pages' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.page = await this.$axios.$get('/api/pages/' + this.$route.params.id)
  }
}
</script>
