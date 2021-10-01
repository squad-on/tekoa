<template>
  <div class="posts">
    <AdminBreadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <v-btn color="success" to="/conta/posts/new">
          <b-icon-plus /> Cadastrar
        </v-btn>
      </div>
      <div v-if="posts">
        <b-table v-if="posts.length" :fields="table" :items="posts" responsive="sm">
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/posts/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <v-btn color="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </v-btn>
          </template>
        </b-table>
        <v-alert v-else dark color="tertiary" class="text-center">Nenhum item encontrado</v-alert>
      </div>
      <div v-else class="text-center">
        <v-progress-circular indeterminate small label="Carregando..." />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'conta',

  data () {
    return {
      posts: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
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
