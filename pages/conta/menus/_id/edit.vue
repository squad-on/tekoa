<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MenuForm v-if="menu" :menu="menu" />
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
      menu: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Menus', to: '/conta/menus' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.menu = await this.$axios.$get('/api/menus/' + this.$route.params.id)
  }
}
</script>
