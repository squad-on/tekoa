<template>
  <div>
    <Breadcrumb
      :links="[['Loja', '/loja']]"
      active="Resumo do pedido"
    />
    <v-container class="pt-4 pb-5">
      <Cart />
      <div v-if="cart && cart.length" class="text-right">
        <v-btn to="/loja" color="secondary">Continuar comprando</v-btn>
        <v-btn color="primary" size="lg" to="/loja/finalizar-pedido">Finalizar pedido</v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart
    }
  }
}
</script>
