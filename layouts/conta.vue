<template>
  <v-app>
    <v-navigation-drawer v-model="show_drawer" app width="314" color="#1A1C28">
      <div class="pa-8 pt-10 pb-10">
        <n-link to="/">
          <v-img
            title="Prolancer.guru"
            :src="require('~/assets/img/logo.png')"
            contain
          />
        </n-link>
      </div>
      <AdminMenu />
    </v-navigation-drawer>
    <v-app-bar dark hide-on-scroll color="#1A1C28" class="d-lg-none">
      <v-img
        title="Prolancer.guru"
        :src="require('~/assets/img/logo.png')"
        contain
        max-width="180"
      />
      <v-spacer />
      <v-app-bar-nav-icon @click="show_drawer = !show_drawer" />
    </v-app-bar>
    <v-main>
      <div class="pt-2 pl-4 pr-4 pl-lg-6 pr-lg-6">
        <Nuxt />
      </div>
    </v-main>
    <Snackbar />
  </v-app>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      show_drawer: null
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
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
