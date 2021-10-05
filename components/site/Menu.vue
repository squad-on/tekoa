<template>
  <div class="pl-3">
    <v-list dark nav>
      <v-list-item class="mb-0" :to="$auth.user ? '/profile' : '/login'">
        <v-list-item-avatar color="#4F516F" size="58">
          <v-img v-if="$auth.user && $auth.user.picture && $auth.user.picture.url" :src="$auth.user.picture.url" />
          <v-icon v-else>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-if="$auth.user" class="text-h6">
            {{ $auth.user.name }}
          </v-list-item-title>
          <v-list-item-title v-else class="text-h6">
            Minha conta
          </v-list-item-title>
          <v-list-item-subtitle v-if="$auth.user">{{ $auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="text-h6">
          <v-btn v-if="$auth.user" icon small>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn v-else icon small to="/login">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-list nav class="pb-0 mt-3" rounded dense>
      <v-list-item to="/" class="ml-n10 pl-12">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/trilhas" class="ml-n10 pl-12">
        <v-list-item-icon>
          <v-icon>mdi-hiking</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Trilhas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/match" class="ml-n10 pl-12">
        <v-list-item-icon>
          <v-icon>mdi-radar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Match</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="item in menus" :key="item._id" v-bind="getLink(item)" class="ml-n10 pl-12">
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user && $auth.user.role === 'admin'" class="ml-n10 pl-12" to="/admin">
        <v-list-item-icon>
          <v-icon>mdi-monitor-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Painel administrativo</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.user" class="ml-n10 pl-12" @click="$auth.logout()">
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
    }
  }
}
</script>
