<template>
  <v-btn :to="'/loja/carrinho'" class="btn-cart" color="primary" size="lg">
    <img src="~assets/img/icon-cart.svg" alt="Carrinho"> &nbsp; {{ cart.length }}
  </v-btn>
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
