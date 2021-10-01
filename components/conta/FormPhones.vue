<template>
  <div class="form-phones">
    <v-form-group label="Telefones">
      <div v-for="(link, index) in value" :key="index">
        <v-text-field v-model="value[index]" v-mask="['(##) ####-####', '(##) #####-####']" outlined type="text" placeholder="(99) 99999-9999" @input="updatePhones" />
      </div>
      <v-btn class="btn btn-light btn-sm" @click="addLink">Adicionar telefone</v-btn>
    </v-form-group>
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
