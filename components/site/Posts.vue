<template>
  <div class="posts-component pt-4">
    <b-row>
      <b-col v-for="post in posts" :key="post._id" lg="6" class="mb-2">
        <b-card :img-src="post.picture ? post.picture.thumb : null" :img-alt="post.title">
          <b-card-text>
            <h5>{{ post.title }}</h5>
            <p class="text-primary"><b-link :to="'/noticias/' + post.slug" class="stretched-link text-white">{{ (post.description || post.content) | truncate(60) }}</b-link></p>
            <tags :tags="post.tags" @click="filterbyTag" />
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    filterbyTag(tag) {
      this.$router.push('/noticias?tag=' + tag)
    }
  }
}
</script>
