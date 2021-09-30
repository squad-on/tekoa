<template>
  <v-list nav class="pb-0 mt-3">
    <v-list-item to="/">
      <v-list-item-icon>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="item in menus" :key="item._id" v-bind="getLink(item)">
      <v-list-item-icon>
        <v-icon>mdi-information-variant</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
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
