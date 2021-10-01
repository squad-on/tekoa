<template>
  <div>
    <v-alert v-if="invalid" type="error" class="d-flex justify-center">Você deve corrigir os erros acima antes de salvar</v-alert>
    <v-btn x-large class="mb-4 mt-4" type="submit" color="success" :disabled="invalid" block>
      Salvar
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    invalid: {
      type: Boolean,
      default: null
    }
  }
}
</script>
