<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <MenuForm v-if="menu" :menu="menu" />
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
      menu: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Menus', to: '/admin/menus' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.menu = await this.$axios.$get('/api/menus/' + this.$route.params.id)
  }
}
</script>
