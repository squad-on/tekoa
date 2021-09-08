<template>
  <div class="form-phones">
    <b-form-group label="Telefones">
      <div v-for="(link, index) in value" :key="index">
        <b-form-input v-model="value[index]" v-mask="['(##) ####-####', '(##) #####-####']" type="text" placeholder="(99) 99999-9999" @input="updatePhones" />
      </div>
      <b-button class="btn btn-light btn-sm" @click="addLink">Adicionar telefone</b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addLink () {
      this.value.push('')
    },
    updatePhones () {
      this.$emit('input', this.value)
    }
  }
}
</script>
