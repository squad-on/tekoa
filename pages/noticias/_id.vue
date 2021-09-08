<template>
  <div v-if="post" class="post-page">
    <Breadcrumb
      :links="[['Desafios', '/noticias']]"
      :active="post.title"
      :description="post.description"
    />
    <section class="mb-5">
      <Banners v-if="post.picture" :items="[post.picture]" />
      <b-container>
        <h1 class="title pt-5">{{ post.title }}</h1>
        <div class="mb-3">
          <tags :tags="post.tags" @click="filterbyTag" />
        </div>
        <p v-if="post.description">{{ post.description }}</p>
        <div class="quill-content mt-4">
          <div v-if="post.content" v-html="post.content" />
          <Documents :documents="post.documents" />
          <share />
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: null
    }
  },
  async created() {
    this.post = await this.$axios.$get('/api/posts/' + this.$route.params.id)
  },
  methods: {
    filterbyTag(tag) {
      this.$router.push('/noticias?tag=' + tag)
    }
  }
}
</script>
