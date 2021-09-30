<template>
  <div class="pages">
    <AdminBreadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <v-btn color="success" to="/conta/pages/new">
          <b-icon-plus /> Cadastrar
        </v-btn>
      </div>
      <div v-if="pages">
        <v-data-table v-if="pages.length" :headers="table" :items="pages" light>
          <template v-slot:item.slug="{ item }">
            <a :href="'/' + item.slug" target="_blank">{{ '/' + item.slug }}</a>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon sm :to="'/conta/pages/' + item.slug + '/edit'">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn icon size="sm" @click="remove(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <b-alert v-else show color="dark" class="text-center">Nenhum item encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner small label="Carregando..." />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'conta',

  data () {
    return {
      pages: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Páginas', active: true }
      ],
      table: [
        { value: 'title', text: 'Título' },
        { value: 'slug', text: 'URL' },
        { value: 'actions', text: '', align: 'right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.pages = await this.$axios.$get('/api/pages')
    },
    remove (page) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/pages/' + page.slug).then(() => {
            this.list()
            this.$toast.success('Página removida com sucesso!')
          })
        }
      })
    }
  }
}
</script>
