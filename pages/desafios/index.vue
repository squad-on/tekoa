<template>
  <div>
    <Breadcrumb
      active="Desafios"
    />
    <Page slug="desafios" />
    <div v-if="posts">
      <Posts :posts="posts" />
      <v-alert v-if="posts.length === 0" color="tertiary">Nenhum desafio encontrado</v-alert>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: null
    }
  },
  async created() {
    this.posts = await this.$axios.$get('/api/posts', { params: this.$route.query })
  }
}
</script>
