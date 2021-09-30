<template>
  <div>
    <Breadcrumb
      active="Loja"
    />
    <v-container class="shop py-4">
      <v-row>
        <v-col cols="12" lg="3">
          <div class="filters">
            <div class="search mb-4">
              <b-input-group>
                <b-form-input v-model="filters.search" type="search" placeholder="O que você busca?" @keyup.prevent.enter="list" />
                <b-input-group-append>
                  <v-btn color="outline-primary" @click="list"><b-icon-search /></v-btn>
                </b-input-group-append>
              </b-input-group>
            </div>
            <b-dropdown :text="'Ordenar por ' + sorts[filters.sort]" color="outline-default" size="sm" class="mb-3">
              <b-dropdown-item v-for="(v, k) in sorts" :key="k" @click="filters.sort = k; list()">{{ v }}</b-dropdown-item>
            </b-dropdown>
            <b-dropdown :text="filters.tag || 'Filtrar por categoria'" color="outline-default" size="sm" class="mb-3">
              <b-dropdown-item @click="filters.tag = null; list()">Todas as categorias</b-dropdown-item>
              <b-dropdown-item v-for="(tag, index) in tags" :key="index" @click="filters.tag = tag; list()">{{ tag }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </v-col>
        <v-col cols="12" lg="9">
          <div>
            <v-row>
              <v-col cols="12" md="9" class="d-flex align-items-center">
                <Found :items="products" />
              </v-col>
              <v-col cols="12" md="3" class="text-lg-right">
                <CartButton />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <div v-if="products" class="products mt-3">
        <b-card-group columns>
          <Product v-for="product in products" :key="product._id" :product="product" />
        </b-card-group>
      </div>
    </v-container>
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
</template>
