<template>
  <div class="medias-page">
    <Breadcrumb
      v-if="media"
      :links="[['Trilhas', '/biblioteca']]"
      :active="media.title"
    />
    <Breadcrumb v-else-if="filters.tag" :links="[['Biblioteca', '/biblioteca']]" :active="filters.tag" />
    <Breadcrumb v-else active="Trilhas" />
    <section class="content">
      <v-container>
        <div>
          <v-row>
            <v-col cols="12" md="3">
              <div class="search mb-4">
                <b-input-group>
                  <b-form-input v-model="filters.search" type="search" placeholder="O que você busca?" @keyup.prevent.enter="list" />
                  <b-input-group-append>
                    <v-btn color="outline-primary" @click="list"><b-icon-search /></v-btn>
                  </b-input-group-append>
                </b-input-group>
              </div>
              <b-card title="Categorias" no-body class="mb-4">
                <b-list-group flush>
                  <b-list-group-item v-for="category in categories" :key="category" class="bg-primary" @click="filters.category = category; list()">{{ category }}</b-list-group-item>
                  <b-list-group-item v-if="filters.category" class="bg-primary" @click="filters.category = null; list()">Todas as categorias</b-list-group-item>
                </b-list-group>
              </b-card>
              <div class="tags mb-4">
                <v-btn v-for="tag in tags" :key="tag" size="sm" color="secondary" :class="{ active: (tag === filters.tag) }" class="mb-1 mr-1" @click="filters.tag = tag; list()">{{ tag }}</v-btn>
                <v-btn v-if="filters.tag" color="primary" @click="filters.tag = null; list()">Todos os temas</v-btn>
              </div>
              <v-btn v-if="filters.search || filters.category || filters.tag" class="mb-4" color="primary" block @click="clearFilters">Limpar filtros</v-btn>
            </v-col>
            <v-col cols="12" md="9" class="medias">
              <div v-if="medias">
                <div class="d-flex align-items-center mb-4">
                  <Found :items="medias" />&nbsp;<span v-if="filters.category" class="text-primary"> em <strong>{{ filters.category }}</strong></span>
                </div>
                <Medias :medias="medias" />
              </div>
              <Media v-if="media" :media="media" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>
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
