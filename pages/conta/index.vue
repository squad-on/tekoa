<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group v-if="$auth.user.role === 'admin'">
      <b-list-group-item to="/conta/pages">Páginas</b-list-group-item>
      <b-list-group-item to="/conta/menus">Menus</b-list-group-item>
      <b-list-group-item to="/conta/posts">Notícias</b-list-group-item>
      <b-list-group-item to="/conta/medias">Midiateca</b-list-group-item>
      <b-list-group-item to="/conta/events">Agenda</b-list-group-item>
      <b-list-group-item to="/conta/loja">Loja</b-list-group-item>
      <b-list-group-item to="/conta/contacts">Contatos</b-list-group-item>
      <b-list-group-item to="/conta/users">Usuários</b-list-group-item>
      <b-list-group-item to="/conta/settings">Configurações</b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <b-list-group-item to="/conta/pedidos">Meus pedidos</b-list-group-item>
      <b-list-group-item to="/conta/profile">Meus dados</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: this.$auth.user.role === 'user' ? 'Minha conta' : 'Painel', active: true }
      ]
    }
  }
}
</script>
