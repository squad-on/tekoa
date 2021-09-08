<template>
  <b-btn :to="'/loja/carrinho'" class="btn-cart" variant="primary" size="lg">
    <img src="~assets/img/icon-cart.svg" alt="Carrinho"> &nbsp; {{ cart.length }}
  </b-btn>
</template>

<script>
export default {
  computed: {
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>
