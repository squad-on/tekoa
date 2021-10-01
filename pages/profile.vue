<template>
  <div class="profile">
    <Breadcrumb active="Editar perfil" />
    <UserForm v-if="profile" :user="profile" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumb: [
        { text: this.$auth.user.role === 'user' ? 'Minha conta' : 'Dashboard', to: '/admin' },
        { text: 'Meu perfil', active: true }
      ],
      profile: null
    }
  },
  async created() {
    this.profile = await this.$axios.$get('/api/profile')
  }
}
</script>
