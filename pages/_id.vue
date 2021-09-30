<template>
  <div class="default-page">
    <div>
      <section class="pb-5">
        <Page :slug="$route.params.id" show-content @notFound="not_found = true" />
        <share v-if="!not_found" />
        <div v-else class="m-5 text-center">
          <div>
            Página não encontrada
          </div>
          <v-btn class="mt-3" @click="$router.go(-1)">Voltar</v-btn>
        </div>
      </section>
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
