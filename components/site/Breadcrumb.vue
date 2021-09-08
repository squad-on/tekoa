<template>
  <div class="breadcrumb-wrapper">
    <div class="container">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <n-link to="/"><b-icon-house-fill class="mr-1" /> {{ settings ? settings.title : '' }}</n-link>
        </li>
        <li v-for="(link, index) in links" :key="index" class="breadcrumb-item">
          <n-link :to="link[1]">{{ link[0] }}</n-link>
        </li>
        <li v-if="active" class="breadcrumb-item active">{{ active }}</li>
      </ol>
    </div>
  </div>
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
