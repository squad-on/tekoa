<template>
  <div>
    <Breadcrumb
      active="Loja"
    />
    <b-container class="shop py-4">
      <b-row>
        <b-col lg="3">
          <div class="filters">
            <div class="search mb-4">
              <b-input-group>
                <b-form-input v-model="filters.search" type="search" placeholder="O que você busca?" @keyup.prevent.enter="list" />
                <b-input-group-append>
                  <b-button variant="outline-primary" @click="list"><b-icon-search /></b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
            <b-dropdown :text="'Ordenar por ' + sorts[filters.sort]" variant="outline-default" size="sm" class="mb-3">
              <b-dropdown-item v-for="(v, k) in sorts" :key="k" @click="filters.sort = k; list()">{{ v }}</b-dropdown-item>
            </b-dropdown>
            <b-dropdown :text="filters.tag || 'Filtrar por categoria'" variant="outline-default" size="sm" class="mb-3">
              <b-dropdown-item @click="filters.tag = null; list()">Todas as categorias</b-dropdown-item>
              <b-dropdown-item v-for="(tag, index) in tags" :key="index" @click="filters.tag = tag; list()">{{ tag }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-col>
        <b-col lg="9">
          <div>
            <b-row>
              <b-col md="9" class="d-flex align-items-center">
                <Found :items="products" />
              </b-col>
              <b-col md="3" class="text-lg-right">
                <CartButton />
              </b-col>
            </b-row>
          </div>
          <div v-if="products" class="products mt-3">
            <b-card-group columns>
              <Product v-for="product in products" :key="product._id" :product="product" />
            </b-card-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import sorts from '@/data/sorts.json'
export default {
  data() {
    return {
      sorts,
      qtds: [],
      filters: {
        tag: this.$route.query.tag,
        search: '',
        sort: 'most_recent'
      },
      products: null,
      tags: []
    }
  },
  async created() {
    this.tags = await this.$axios.$get('/api/shop/tags')
    this.list()
  },
  methods: {
    async list() {
      this.products = null
      this.products = await this.$axios.$get('/api/shop/products', { params: this.filters })
    },
    clearFilters() {
      this.filters = {
        search: '',
        tags: []
      }
      location.href = '/'
    }
  }
}
</script>
