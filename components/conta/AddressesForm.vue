<template>
  <div class="addresses-form">
    <div v-for="(address, index) in value" :key="index" class="mb-3">
      <AddressPreview :address="address" />
      <span v-if="value && value.length > 1">
        <v-btn v-if="index === 0" color="success" size="sm" disabled>Endereço padrão</v-btn>
        <v-btn v-else color="light" size="sm" @click="setDefault(index)">Marcar como padrão</v-btn>
      </span>
      <v-btn color="danger" size="sm" @click="remove(index)">Remover</v-btn>
    </div>
    <div v-if="new_address">
      <AddressForm v-model="new_address" @input="add" />
    </div>
  </div>
</template>
<script>
const emptyForm = {
  city: '',
  uf: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  postal_code: '',
  description: '',
  source: '',
  location: {
    type: 'Point',
    coordinates: []
  }
}

export default {
  props: {
    value: {
      type: Array,
      default: () => null
    }
  },
  data() {
    return {
      new_address: null
    }
  },
  computed: {
  },
  created() {
    this.new_address = { ...emptyForm }
  },
  methods: {
    add(address) {
      const addresses = [...this.value]
      addresses.push(address)
      this.$emit('input', addresses)
      this.new_address = null
      setTimeout(() => {
        this.new_address = { ...emptyForm }
      }, 1000)
    },
    remove(index) {
      const addresses = [...this.value]
      delete addresses.splice(index, 1)
      this.$emit('input', addresses)
    },
    setDefault(index) {
      const addresses = [...this.value]
      addresses.splice(0, 0, addresses.splice(index, 1)[0])
      this.$emit('input', addresses)
    }
  }
}
</script>
