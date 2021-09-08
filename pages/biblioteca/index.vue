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
      <b-container>
        <div>
          <b-row>
            <b-col md="3">
              <div class="search mb-4">
                <b-input-group>
                  <b-form-input v-model="filters.search" type="search" placeholder="O que você busca?" @keyup.prevent.enter="list" />
                  <b-input-group-append>
                    <b-button variant="outline-primary" @click="list"><b-icon-search /></b-button>
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
                <b-button v-for="tag in tags" :key="tag" size="sm" variant="secondary" :class="{ active: (tag === filters.tag) }" class="mb-1 mr-1" @click="filters.tag = tag; list()">{{ tag }}</b-button>
                <b-button v-if="filters.tag" variant="primary" @click="filters.tag = null; list()">Todos os temas</b-button>
              </div>
              <b-button v-if="filters.search || filters.category || filters.tag" class="mb-4" variant="primary" block @click="clearFilters">Limpar filtros</b-button>
            </b-col>
            <b-col md="9" class="medias">
              <div v-if="medias">
                <div class="d-flex align-items-center mb-4">
                  <Found :items="medias" />&nbsp;<span v-if="filters.category" class="text-primary"> em <strong>{{ filters.category }}</strong></span>
                </div>
                <Medias :medias="medias" />
              </div>
              <Media v-if="media" :media="media" />
            </b-col>
          </b-row>
        </div>
      </b-container>
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
