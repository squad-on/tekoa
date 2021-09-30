<template>
  <div class="mb-5">
    <div v-if="cart && cart.length">
      <table class="table b-table b-table-stacked-lg">
        <thead>
          <tr>
            <th class="text-center" />
            <th>Oferta</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Frete</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>
              <b-img v-if="item.product.pictures && item.product.pictures.length" :src="item.product.pictures[0].thumb" width="100" alt="placeholder" />
              <b-img v-else blank blank-color="#E1846D" width="100" alt="placeholder" />
            </td>
            <td>
              <router-link :to="'/loja/'+item.product._id" class="text-dark">
                {{ item.product.name }}
              </router-link>
            </td>
            <td>
              {{ item.product.price | moeda }}
            </td>
            <td>
              {{ item.qtd }}
            </td>
            <td>
              <small v-if="loading_shipping">
                <b-spinner small /> Calculando frete...
              </small>
              <div v-else-if="shipping[item.product._id] && shipping[item.product._id].length">
                <b-form-radio v-for="option in shipping[item.product._id]" :key="option.code" class="mb-2" :name="item.product._id" :value="option" :checked="item.shipping" @input="(selected) => setShipping(item.product._id, selected)">
                  <small>
                    <strong>{{ option.description }}</strong>
                    <span v-if="option.delivery_saturday">(Entrega sábado)</span>
                    <br>
                    Até <strong>{{ option.delivery_time }} dias</strong> por <strong>{{ option.price * item.qtd | moeda }}</strong>
                  </small>
                </b-form-radio>
              </div>
            </td>
            <td>
              <strong v-if="!loading_shipping">{{ (item.product.price * item.qtd) + (item.shipping ? item.shipping.price * item.qtd : 0) | moeda }}</strong>
            </td>
            <td class="text-center">
              <v-btn size="sm" color="light" rel="tooltip" data-placement="left" title="Remover do carrinho" @click="removeFromCart(index)">
                <b-icon-trash />
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">
              Frete
            </td>
            <td>
              <b-form-input v-model="postal_code" v-mask="'#####-###'" style="max-width: 130px;" @input="updatePostalCode()" />
            </td>
            <td>
              <strong v-if="!loading_shipping">{{ shippingTotal | moeda }}</strong>
              <b-spinner v-else small />
            </td>
            <td />
          </tr>
          <tr>
            <td colspan="5" class="text-right">
              <strong>Total da compra</strong>
            </td>
            <td>
              <strong v-if="!loading_shipping">{{ total + shippingTotal | moeda }}</strong>
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else class="text-center my-5">
      <h4>Seu carrinho está vazio</h4>
      <v-btn to="/loja" color="light">
        Voltar para a loja
      </v-btn>
      <v-btn to="/conta/pedidos" color="primary">
        Ver meus pedidos
      </v-btn>
    </div>
  </div>
</template>

<script>
import { optionText } from '@/utils'
export default {
  data () {
    return {
      optionText,
      postal_code: null,
      shipping: {},
      loading_shipping: false
    }
  },
  computed: {
    currentPostalCode() {
      return this.$store.state.postal_code
    },
    cart() {
      return this.$store.state.cart
    },
    sourcePostalCode() {
      return this.$store.state.settings.postal_code
    },
    total() {
      return this.cart.reduce(function(a, item) {
        return a + (Number(item.qtd) * Number(item.product.price))
      }, 0)
    },
    shippingTotal() {
      return this.cart.map(i => (i.shipping ? i.shipping.price * i.qtd : 0)).reduce(function(a, b) {
        return a + b
      }, 0)
    }
  },
  watch: {
    currentPostalCode() {
      this.postal_code = this.currentPostalCode
      this.calcShipping()
    }
  },
  created() {
    this.postal_code = this.currentPostalCode
    if (!this.postal_code && this.$auth.user && this.$auth.user.addresses && this.$auth.user.addresses.length && this.$auth.user.addresses[0].postal_code) {
      this.postal_code = this.$auth.user.addresses[0].postal_code
      this.updatePostalCode()
    } else {
      this.calcShipping()
    }
  },
  methods: {
    removeFromCart(index) {
      this.$store.commit('removeFromCart', index)
    },
    clearCart() {
      this.$store.commit('clearCart')
      this.notify('Carrinho limpo!')
      this.$router.replace('/loja')
    },
    setShipping(product, shipping) {
      this.$store.commit('setCartShipping', { product, shipping })
    },
    updatePostalCode() {
      if (this.postal_code && this.postal_code.length === 9) {
        this.$store.commit('setPostalCode', this.postal_code)
        this.calcShipping()
      }
    },
    async calcShipping() {
      if (this.sourcePostalCode && this.sourcePostalCode.length === 9) {
        if (this.currentPostalCode && this.currentPostalCode.length === 9) {
          const shipping = {}
          this.loading_shipping = true
          for (const item of this.cart) {
            const selected = item.shipping
            if (selected) {
              this.$store.commit('setCartShipping', { product: item.product._id, shipping: null })
            }
            const shippingOptions = await this.$axios.$post('/api/shop/calc_shipping', {
              source: this.sourcePostalCode,
              destination: this.currentPostalCode,
              product: item.product._id
            })
            shipping[item.product._id] = shippingOptions

            if (shippingOptions && shippingOptions.length) {
              let shippingOption = null
              if (selected) {
                shippingOption = shippingOptions.find(option => option.code === selected.code)
              }
              if (!shippingOption) {
                shippingOption = shippingOptions[0]
              }
              this.$store.commit('setCartShipping', { product: item.product._id, shipping: shippingOption })
            }
          }
          this.shipping = shipping
          this.loading_shipping = false
        }
      } else {
        this.$toast.error('Não foi possível calcular o frete pois o CEP de origem não está configurado!')
      }
    }
  }
}
</script>
