<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <UserForm v-if="user" :user="user" />
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
      user: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Usuários', to: '/conta/users' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.user = await this.$axios.$get('/api/users/' + this.$route.params.id)
  }
}
</script>
