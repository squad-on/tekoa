<template>
  <v-app>
    <div v-show="settings">
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
        <v-list dark nav>
          <v-list-item class="mb-0">
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
        <Menu />
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
        <div class="pt-2 pl-6 pr-6">
          <Nuxt />
          <v-divider />
          <Footer />
        </div>
      </v-main>
      <Portal />
      <Snackbar />
    </div>
    <div v-if="!settings" class="my-5">
      <v-container>
        <h4>Este site ainda não foi configurado.</h4>
        <h5 class="mb-5">Vamos configurá-lo?</h5>
        <SetupForm />
      </v-container>
    </div>
  </v-app>
</template>
<script>
export default {
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
    const title = (this.settings ? this.settings.title : process.env.APP_NAME)
    const description = (this.settings ? this.settings.description : '')
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: title
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (this.settings && this.settings.favicon ? this.settings.favicon.url : '/favicon.ico') }
      ]
    }
  }
}
</script>
