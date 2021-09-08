<template>
  <div class="products">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="success" to="/conta/produtos/new">
          <b-icon-plus /> Cadastrar
        </b-button>
      </div>
      <div v-if="products">
        <ul v-if="products.length" class="list-unstyled">
          <b-media v-for="product in products" :key="product.id" tag="li" class="mb-4">
            <template #aside>
              <b-img v-if="product.pictures && product.pictures.length" :src="product.pictures[0].thumb" blank-color="#abc" width="100" alt="placeholder" />
              <b-img v-else blank blank-color="#E1846D" width="100" alt="placeholder" />
            </template>
            <h5 class="mt-0 mb-1">
              {{ product.name }}
            </h5>
            <p class="mb-2">
              <small>{{ product.price | moeda }}</small>
              <small> / {{ product.qtd }} em estoque</small>
              <small v-if="product.orders"> / {{ product.orders.length }} pedidos</small>
              <small>
                <b-badge v-if="product.published" v-b-tooltip variant="success" title="Publicado na loja"><b-icon-check /> Publicado</b-badge>
                <b-badge v-else v-b-tooltip variant="light" title="Não publicado na loja">Não publicado</b-badge>
              </small>
            </p>
            <p class="mb-1">
              <n-link class="btn btn-info btn-sm" :to="'/conta/produtos/' + product._id + '/edit'">
                Editar
              </n-link>
              <b-button variant="danger" size="sm" @click="remove(product)">
                Excluír
              </b-button>
            </p>
          </b-media>
        </ul>
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner small label="Carregando..." />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'conta',

  data () {
    return {
      products: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Loja', to: '/conta/loja' },
        { text: 'Produtos', active: true }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.products = await this.$axios.$get('/api/products')
    },
    remove (product) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/products/' + product._id).then(() => {
            this.list()
            this.$toast.success('Produto removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
