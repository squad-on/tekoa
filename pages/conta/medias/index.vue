<template>
  <div class="medias">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="success" to="/conta/medias/new">
          <b-icon-plus /> Cadastrar
        </b-button>
      </div>
      <div v-if="medias">
        <b-table v-if="medias.length" :fields="table" :items="medias" responsive="sm">
          <template v-slot:cell(picture)="data">
            <b-img :src="data.value.thumb" width="100" rounded />
          </template>
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(publishing_date)="data">
            {{ $moment(data.value).format(data.item.publishing_date_format || "DD/MM/YYYY") }}
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/medias/' + data.item._id + '/edit'">
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
      medias: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Trilhas', active: true }
      ],
      table: [
        { key: 'picture', label: '' },
        { key: 'title', label: 'Título' },
        { key: 'category', label: 'Categoria' },
        { key: 'tags', label: 'Tags' },
        { key: 'publishing_date', label: 'Publicação' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.medias = await this.$axios.$get('/api/medias')
    },
    remove (media) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/medias/' + media._id).then(() => {
            this.list()
            this.$toast.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
