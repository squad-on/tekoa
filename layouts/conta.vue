<template>
  <div class="default-layout">
    <div class="conta">
      <Header />
      <div class="mb-4" fluid>
        <b-navbar toggleable="lg" variant="light" class="d-block d-sm-none">
          <b-container fluid="lg">
            <b-navbar-brand to="/conta" class="text-primary">
              Minha conta
            </b-navbar-brand>
            <b-navbar-toggle target="conta-header">
              <font-awesome-icon icon="bars" />
            </b-navbar-toggle>
            <b-collapse id="conta-header" is-nav>
              <b-navbar-nav>
                <b-nav-item to="/conta">
                  <strong>{{ $auth.user.name }}</strong>
                  <br>
                  <small>{{ userRoleText }}</small>
                </b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/pages">Páginas</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/menus">Menus</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/medias">Trilhas</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/posts">Desafios</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/events">Agenda</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/loja">Loja</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/contacts">Contatos</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/users">Usuários</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/settings">Configurações</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'user'" to="/conta/pedidos">Meus pedidos</b-nav-item>
                <b-nav-item to="/conta/profile">Meus dados</b-nav-item>
                <b-nav-item @click="logout"><small>Sair</small></b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
        </b-navbar>
        <b-container fluid="lg" class="mt-3">
          <b-row>
            <b-col sm="3" class="d-none d-sm-block">
              <div class="sidebar py-2 px-1">
                <b-nav vertical>
                  <b-nav-item to="/conta" active-class="profile-info">
                    <strong>{{ $auth.user.name }}</strong>
                    <br>
                    <small>({{ userRoleText }})</small>
                  </b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/pages">Páginas</b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/menus">Menus</b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/medias">Trilhas</b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/posts">Desafios</b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/events">Agenda</b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/contacts">Contatos</b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/users">Usuários</b-nav-item>
                  <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/settings">Configurações</b-nav-item>
                  <b-nav-item to="/conta/profile">Meus dados</b-nav-item>
                  <b-nav-item @click="logout"><small>Sair</small></b-nav-item>
                </b-nav>
              </div>
            </b-col>
            <b-col sm="9">
              <Nuxt />
            </b-col>
          </b-row>
        </b-container>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import { optionText } from '@/utils'
export default {
  middleware: 'auth',
  computed: {
    userRoleText() {
      let roleText = null
      if (this.$auth.user) {
        roleText = optionText(this.$auth.user.role, 'roles')
      }
      return roleText
    },
    settings () {
      return this.$store.state.settings
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  },
  head () {
    return {
      title: (this.settings ? this.settings.title : process.env.APP_NAME),
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (this.settings && this.settings.favicon ? this.settings.favicon.url : '/favicon.ico') }
      ]
    }
  }
}
</script>
