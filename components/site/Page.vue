<template>
  <div>
    <Banners v-if="page" :items="page.pictures" />
    <Breadcrumb
      v-if="page"
      :active="page.title"
      :description="page.description"
    />
    <div v-if="page" class="page">
      <b-container>
        <div class="title mt-4">
          <h4 v-if="page.title" class="title">{{ page.title }}</h4>
          <hr>
        </div>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="!showContent" class="text-center mb-5">
          <b-button v-if="page.content || (page.pictures && page.pictures.length) || (page.documents && page.documents.length)" variant="secondary" @click="showMore = !showMore">
            Saiba mais
          </b-button>
        </div>
        <div v-if="showMore || showContent" class="quill-content mt-4">
          <div v-html="page.content" />
          <Documents :documents="page.documents" />
        </div>
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    slug: {
      type: String,
      default: null
    },
    showContent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      page: null,
      showMore: false

    }
  },
  async created() {
    this.page = await this.$axios.$get('/api/pages/' + this.slug)
    if (!this.page) {
      this.$emit('notFound')
    }
  }
}
</script>
