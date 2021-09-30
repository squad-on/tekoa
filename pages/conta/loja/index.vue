<template>
  <div class="events">
    <AdminBreadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <v-btn color="secondary" block to="/conta/produtos">
          Produtos
        </v-btn>
        <v-btn color="secondary" block to="/conta/pedidos">
          Pedidos
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'conta',

  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Loja', active: true }
      ]
    }
  }
}
</script>
