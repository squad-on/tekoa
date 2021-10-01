<template>
  <div class="medias-page">
    <Breadcrumb
      v-if="media"
      :links="[['Trilhas', '/biblioteca']]"
      :active="media.title"
    />
    <Breadcrumb v-else-if="filters.tag" :links="[['Biblioteca', '/biblioteca']]" :active="filters.tag" />
    <Breadcrumb v-else active="Trilhas" />
    <v-text-field v-model="filters.search" type="search" label="O que você busca?" solo append-icon="mdi-magnify" rounded color="primary" background-color="tertiary" @keyup.prevent.enter="list" />
    <div class="mb-4">
      <v-btn v-for="category in categories" :key="category" rounded :color="filters.category === category ? 'primary' : 'tertiary'" class="mb-1 mr-1" small @click="filters.category !== category ? filters.category = category : filters.category = null; list()">
        {{ category }}
        <v-icon v-if="filters.category === category" small>mdi-window-close</v-icon>
      </v-btn>
    </div>
    <!-- <div class="tags mb-4">
      <v-btn v-for="tag in tags" :key="tag" size="sm" color="secondary" :class="{ active: (tag === filters.tag) }" class="mb-1 mr-1" @click="filters.tag = tag; list()">{{ tag }}</v-btn>
      <v-btn v-if="filters.tag" color="primary" @click="filters.tag = null; list()">Todos os temas</v-btn>
    </div> -->
    <div v-if="medias">
      <div class="d-flex align-items-center mb-4">
        <Found :items="medias" />&nbsp;<span v-if="filters.category" class="text-primary"> em <strong>{{ filters.category }}</strong></span>
      </div>
      <Medias :medias="medias" />
    </div>
    <Media v-if="media" :media="media" />
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
  },
  watchQuery(newQuery) {
    this.list(newQuery)
  }
}
</script>
