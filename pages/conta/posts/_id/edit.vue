<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <PostForm v-if="post" :post="post" />
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
      post: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Desafios', to: '/conta/posts' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.post = await this.$axios.$get('/api/posts/' + this.$route.params.id)
  }
}
</script>
