<template>
  <div class="pl-3">
    <v-list dark nav>
      <v-list-item class="mb-0" to="/conta/profile">
        <v-list-item-avatar color="#4F516F" size="58">
          <v-img v-if="$auth.user && $auth.user.picture && $auth.user.picture.url" :src="$auth.user.picture.url" />
          <v-icon v-else>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-if="$auth.user && $auth.user.name" class="text-h6">
            {{ $auth.user.name }}
          </v-list-item-title>
          <v-list-item-title v-else class="text-h6">
            Entre com sua conta
          </v-list-item-title>
          <v-list-item-subtitle v-if="$auth.user">{{ $auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list nav class="pb-0 mt-3" dense rounded>
      <v-list-item to="/conta" exact class="ml-n10 pl-12">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/medias">
        <v-list-item-icon>
          <v-icon>mdi-hiking</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Trilhas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/posts">
        <v-list-item-icon>
          <v-icon>mdi-radar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Desafios</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/events">
      <v-list-item-icon>
        <v-icon>mdi-shield-star</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Reconhecimento</v-list-item-title>
      </v-list-item-content>
    </v-list-item> -->
      <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/pages">
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Páginas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/menus">
        <v-list-item-icon>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Menus</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/contacts">
        <v-list-item-icon>
          <v-icon>mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Contatos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/users">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Usuários</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user.role === 'admin'" to="/conta/settings">
        <v-list-item-icon>
          <v-icon>mdi-tune</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Configurações</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menus: null
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  },
  created () {
    this.list()
  },
  methods: {
    getLink (item) {
      if (item.url) {
        if (item.url.startsWith('http')) {
          return { href: item.url }
        } else {
          return { to: item.url }
        }
      } else if (item.page && item.page.slug) {
        return { to: '/' + item.page.slug }
      }
    },
    async list () {
      this.menus = await this.$axios.$get('/api/menus/submenus', { params: { populate: 'page' } })
    },
    logout () {
      this.$auth.logout()
    }

  }
}
</script>
