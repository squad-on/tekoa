<template>
  <div>
    <Breadcrumb
      active="Desafios"
    />
    <section class="content pb-5">
      <Page slug="desafios" />
      <v-container>
        <tags :to="$route.path" />
        <div v-if="posts">
          <Posts :posts="posts" />
          <div v-if="posts.length === 0" class="alert text-center">Nenhum desafio encontrado</div>
          <share />
        </div>
      </v-container>
    </section>
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
