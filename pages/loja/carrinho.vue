<template>
  <div>
    <Breadcrumb
      :links="[['Loja', '/loja']]"
      active="Resumo do pedido"
    />
    <b-container class="pt-4 pb-5">
      <Cart />
      <div v-if="cart && cart.length" class="text-right">
        <b-button to="/loja" variant="secondary">Continuar comprando</b-button>
        <b-button variant="primary" size="lg" to="/loja/finalizar-pedido">Finalizar pedido</b-button>
      </div>
    </b-container>
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
