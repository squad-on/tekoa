<template>
  <div class="medias-page">
    <Breadcrumb active="Trilhas" />
    <v-text-field v-model="filters.search" type="search" label="O que você busca?" solo append-icon="mdi-magnify" rounded color="primary" background-color="tertiary" clearable @keyup.prevent.enter="list" @click:clear="list" />
    <div class="mb-6">
      <v-btn v-for="category in categories" :key="category" rounded :color="filters.category === category ? 'primary' : 'tertiary'" class="mb-1 mr-1" small @click="filters.category !== category ? filters.category = category : filters.category = null; list()">
        {{ category }}
        <v-icon v-if="filters.category === category" small>mdi-window-close</v-icon>
      </v-btn>
    </div>
    <Medias :medias="medias" />
  </div>
</template>
<script>
import categories from '@/data/categories'
export default {
  data () {
    return {
      medias: null,
      categories,
      filters: {
        tag: this.$route.query.tag,
        category: this.$route.query.category,
        search: ''
      }
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.medias = await this.$axios.$get('/api/medias', { params: this.filters })
    },
    clearFilters () {
      this.filters.search = null
      this.filters.category = null
      this.list()
    }
  }
}
</script>
