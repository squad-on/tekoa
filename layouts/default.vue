<template>
  <div class="default-layout" :class="{ 'header-transparent': $route.path === '/' && settings && settings.banners && settings.banners.length > 0 }">
    <div v-show="settings">
      <Header />
      <!-- <div class="sub-header" /> -->
      <Nuxt />
      <Footer />
    </div>
    <div v-if="!settings" class="my-5">
      <b-container>
        <h4>Este site ainda não foi configurado.</h4>
        <h5 class="mb-5">Vamos configurá-lo?</h5>
        <SetupForm />
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
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
