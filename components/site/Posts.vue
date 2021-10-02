<template>
  <div class="posts-component pt-4">
    <v-row>
      <v-col v-for="post in posts" :key="post._id" cols="12" sm="4" md="3">
        <v-card color="tertiary" :to="'/desafios/' + post.slug">
          <v-img :src="post.picture ? post.picture.thumb : null" :alt="post.title" :aspect-ratio="16/9" />
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>
            <p class="text-primary">{{ (post.description || post.content) | truncate(60) }}</p>
            <tags :tags="post.tags" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
      this.$router.push('/desafios?tag=' + tag)
    }
  }
}
</script>
