<template>
  <div class="profile">
    <b-breadcrumb :items="breadcrumb" />
    <UserForm v-if="profile" :user="profile" />
  </div>
</template>

<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: this.$auth.user.role === 'user' ? 'Minha conta' : 'Painel', to: '/conta' },
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
