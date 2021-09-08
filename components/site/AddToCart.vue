<template>
  <div class="add-to-cart">
    <div>
      <div v-if="availableQtd > 0" class="cart-actions">
        <div class="price">
          <span class="currency">R$</span>{{ splitPrice(product.price).value }},<span class="decimal">{{ splitPrice(product.price).decimal }}</span>
        </div>
        <div class="qtd">
          <b-form-input v-model="qtd" :max="availableQtd" />
          <div class="buttons">
            <span class="minus" @click="sub()">-</span>
            <span class="plus" @click="add()">+</span>
          </div>
        </div>
        <b-button variant="primary" size="sm" @click="addToCart(product)">
          <img src="~assets/img/icon-cart.svg" alt="Adicionar ao carrinho"> <b-icon-chevron-right />
          <small v-if="alreadyOnCart > 0" class="btn-cart-counter">{{ alreadyOnCart }}</small>
        </b-button>
      </div>
      <div class="info">
        <p v-if="product.box_qtd && product.box_qtd.value"><strong>{{ product.box_qtd.value }} {{ product.box_qtd.unit }}</strong> por caixa/embalagem</p>
        <p v-if="availableQtd == 0">Produto sem estoque</p>
        <p v-else><strong>{{ availableQtd }}</strong> disponíveis</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      qtd: 1
    }
  },
  computed: {
    alreadyOnCart() {
      let qtd = 0
      const cart = this.$store.state.cart
      if (cart && cart.length) {
        qtd = cart.filter(i => i.product._id === this.product._id).reduce((a, b) => {
          return a + b.qtd
        }, 0)
      }
      return qtd
    },
    availableQtd() {
      let qtd = 0
      if (this.product) {
        qtd = this.product.qtd - this.alreadyOnCart
      }
      return qtd
    }
  },
  methods: {
    splitPrice(price) {
      const splitedPrice = price.toString().split('.')
      const ret = { value: splitedPrice[0] }
      if (splitedPrice[1]) {
        ret.decimal = splitedPrice[1].slice(0, 2)
      } else {
        ret.decimal = '00'
      }
      if (ret.decimal.length === 1) {
        ret.decimal += '0'
      }
      return ret
    },
    add() {
      if (this.qtd < this.availableQtd) {
        this.qtd += 1
      }
    },
    sub() {
      if (this.qtd > 1) {
        this.qtd -= 1
      }
    },
    addToCart() {
      if (this.qtd <= this.availableQtd) {
        this.$store.commit('addToCart', {
          product: this.product,
          qtd: this.qtd
        })
        this.$toast.success(this.qtd + ' ' + this.product.name + ' adicionado ao carrinho')
      } else {
        this.$toast.error('A quantidade solicitada (' + this.qtd + ') excede a quantidade disponível em estoque (' + this.availableQtd + ')')
      }
    }
  }
}
</script>
