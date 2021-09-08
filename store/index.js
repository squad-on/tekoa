export const state = () => ({
  settings: null,
  cart: [],
  postal_code: null
})

export const mutations = {
  updateSettings(state, settings) {
    state.settings = settings
  },
  setPostalCode(state, postalCode) {
    console.log('set postal code', postalCode, postalCode.length)
    state.postal_code = postalCode
  },
  addToCart(state, cartItem) {
    const i = state.cart.findIndex(
      (item) => item.product._id === cartItem.product._id
    )
    if (i >= 0) {
      state.cart[i].qtd += cartItem.qtd
    } else {
      state.cart.push(cartItem)
    }
  },
  setCartShipping(state, shippingOption) {
    const i = state.cart.findIndex(
      (item) => item.product._id === shippingOption.product
    )
    if (i >= 0) {
      state.cart[i].shipping = shippingOption.shipping
    }
  },
  removeFromCart(state, index) {
    delete state.cart[index]
    state.cart.splice(index, 1)
  },
  clearCart(state) {
    state.cart = []
  }
}

export const actions = {
  async nuxtServerInit({
    commit,
    state
  }, { $axios, req }) {
    if (!state.settings) {
      const data = await $axios.$get('/api/settings')
      if (data) {
        commit('updateSettings', data)
      }
    }
  }
}
