<template>
  <v-app>
    <div v-show="settings">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <div style="width: 100%" class="px-md-10">
            <v-container fluid class="d-flex justify-center mb-3 mt-6">
              <n-link to="/">
                <v-img
                  title="Prolancer.guru"
                  :src="require('~/assets/img/logo.png')"
                  contain
                  max-width="260"
                />
              </n-link>
            </v-container>
            <v-main>
              <Nuxt />
            </v-main>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="overflow-y-hidden">
          <v-img :src="require('~/assets/img/login.png')" contain />
        </v-col>
      </v-row>
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
