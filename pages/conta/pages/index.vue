<template>
  <div class="pages">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="success" to="/conta/pages/new">
          <b-icon-plus /> Cadastrar
        </b-button>
      </div>
      <div v-if="pages">
        <b-table v-if="pages.length" :fields="table" :items="pages" responsive="sm">
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(slug)="data">
            <a :href="'/' + data.value" target="_blank">{{ '/' + data.value }}</a>
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/pages/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
          </template>
        </b-table>
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
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
        { text: 'Painel', to: '/conta' },
        { text: 'Páginas', active: true }
      ],
      table: [
        { key: 'title', label: 'Título' },
        { key: 'slug', label: 'Url' },
        { key: 'actions', label: '', class: 'text-right' }
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
