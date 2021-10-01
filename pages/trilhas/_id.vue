<template>
  <div class="medias-page">
    <div v-if="media">
      <Breadcrumb
        v-if="media"
        :links="[['Trilhas', '/trilhas']]"
        :active="media.title"
      />
      <Media v-if="media" :media="media" />
    </div>
  </div>
</template>
<script>
import categories from '@/data/categories'
export default {
  data () {
    return {
      medias: null,
      media: null,
      tags: [],
      categories,
      filters: {
        tag: this.$route.query.tag,
        category: this.$route.query.category,
        search: ''
      }
    }
  },
  watchQuery(newQuery) {
    this.list(newQuery)
  },
  async created () {
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
    } else {
      this.list(this.$route.query)
    }
    this.tags = await this.$axios.$get('/api/medias/tags')
  },
  methods: {
    async list (query) {
      this.media = null
      this.medias = await this.$axios.$get('/api/medias', { params: this.filters })
    },
    async get (id) {
      this.medias = null
      this.media = await this.$axios.$get('/api/medias/' + id)
    },
    clearFilters () {
      this.filters.search = null
      this.filters.tag = null
      this.filters.category = null
      this.list()
    }
  }
}
</script>
