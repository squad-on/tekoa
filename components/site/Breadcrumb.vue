<template>
  <v-toolbar dark color="#151621" elevation="0" class="pt-3 mb-8">
    <v-btn
      v-if="$route.path !== '/'"
      small
      class="tertiary ml-n4"
      icon
      @click="$router.replace(links && links.length ? links[links.length -1][1] : '/')"
    >
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-toolbar-title v-if="active">
      <strong class="primary--text">{{ active }}</strong>
    </v-toolbar-title>
    <v-toolbar-title v-else class="ml-n4">
      <strong class="secondary--text">Bem vindo <span v-if="$auth.user && $auth.user.name" class="primary--text">{{ $auth.user.name }}</span></strong>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => null
    },
    active: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  created() {
    // this.$store.commit('setPageTitle', this.pageTitle())
    // this.$store.commit('setPageDescription', this.pageDescription())
  },
  methods: {
    pageTitle() {
      const links = this.links || []
      const title = [
        (this.settings ? this.settings.title : process.env.APP_NAME),
        ...links.map((link) => link[0]),
        this.active
      ]
      return title.reverse().join(' | ')
    },
    pageDescription() {
      return this.description || process.env.npm_package_description
    }
  },
  head() {
    const meta = [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: this.pageDescription()
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: this.pageDescription()
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: this.pageTitle()
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: process.env.BASE_URL + this.$route.path
      }
    ]
    if (this.img) {
      meta.push({
        hid: 'og:image',
        name: 'og:image',
        content: this.img
      })
    }
    return {
      title: this.pageTitle(),
      meta
    }
  }
}
</script>
