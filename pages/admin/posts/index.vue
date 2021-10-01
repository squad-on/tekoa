<template>
  <div>
    <AdminBreadcrumb :items="breadcrumb" />
    <v-btn
      to="/admin/posts/new"
      fab
      bottom
      right
      fixed
      color="success"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="posts">
      <v-list v-if="posts.length" color="tertiary" class="rounded">
        <template v-for="(post, index) in posts">
          <v-list-item :key="post._id" :to="'/admin/posts/' + post.slug + '/edit'">
            <v-list-item-avatar v-if="post.picture">
              <v-img :src="post.picture.thumb || post.picture.url" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle v-if="post.tags && post.tags.length">
                <tags :tags="post.tags" />
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < posts.length - 1"
            :key="index"
          />
        </template>
      </v-list>
      <v-alert v-else dark color="tertiary" class="text-center">Nenhum item encontrado</v-alert>
    </div>
    <v-skeleton-loader
      v-else
      type="list-item-two-line@3"
    />
  </div>
</template>

<script>

export default {
  layout: 'admin',

  data () {
    return {
      posts: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Desafios', active: true }
      ],
      table: [
        { key: 'title', label: 'Título' },
        { key: 'tags', label: 'Tags' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.posts = await this.$axios.$get('/api/posts')
    },
    remove (post) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/posts/' + post.slug).then(() => {
            this.list()
            this.$notifier.success('Notícia removida com sucesso!')
          })
        }
      })
    }
  }
}
</script>
