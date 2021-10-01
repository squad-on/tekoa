<template>
  <div class="default-page">
    <div>
      <Page :slug="$route.params.id" show-content @notFound="not_found = true" />
      <div v-if="not_found" class="ma-5 text-center">
        <div>
          Página não encontrada
        </div>
        <v-btn class="mt-3" @click="$router.go(-1)">Voltar</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      not_found: false
    }
  }
}
</script>
