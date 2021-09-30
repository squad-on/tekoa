<template>
  <div class="m-5 text-center">
    <h3 v-if="error.statusCode === 404">Página não encontrada</h3>
    <h3 v-else>Ocorreu um erro</h3>
    <v-btn @click="$router.go(-1)">Voltar</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
