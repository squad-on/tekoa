<template>
  <div class="events">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="success" to="/conta/events/new">
          <b-icon-plus /> Cadastrar
        </b-button>
      </div>
      <div v-if="events">
        <b-table v-if="events.length" :fields="table" :items="events" responsive="sm">
          <template v-slot:cell(start_at)="data">
            {{ $moment(data.value).format("DD/MM/YYYY") }}
          </template>
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/events/' + data.item._id + '/edit'">
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
      events: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Avaliação', active: true }
      ],
      table: [
        { key: 'start_at', label: 'Data' },
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
      this.events = await this.$axios.$get('/api/events')
    },
    remove (event) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/events/' + event._id).then(() => {
            this.list()
            this.$toast.success('Evento removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
