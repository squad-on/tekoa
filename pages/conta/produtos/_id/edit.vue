<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ProductForm v-if="product" :product="product" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      product: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Loja', to: '/conta/loja' },
        { text: 'Produtos', to: '/conta/produtos' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.product = await this.$axios.$get('/api/products/' + this.$route.params.id)
  }
}
</script>
