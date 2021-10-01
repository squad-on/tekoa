<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <UserForm v-if="user" :user="user" />
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
      user: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Usuários', to: '/admin/users' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.user = await this.$axios.$get('/api/users/' + this.$route.params.id)
  }
}
</script>
