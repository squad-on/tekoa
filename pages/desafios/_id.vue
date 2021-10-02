<template>
  <div v-if="post" class="post-page">
    <Breadcrumb
      :links="[['Desafios', '/desafios']]"
      :active="post.title"
      :description="post.description"
    />
    <Banners v-if="post.picture" :items="[post.picture]" />
    <div class="mb-6">
      <tags :tags="post.tags" />
    </div>
    <p v-if="post.description">{{ post.description }}</p>
    <div class="quill-content mt-4">
      <div v-if="post.content" v-html="post.content" />
      <Documents :documents="post.documents" />
    </div>
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
      this.$router.push('/desafios?tag=' + tag)
    }
  }
}
</script>
