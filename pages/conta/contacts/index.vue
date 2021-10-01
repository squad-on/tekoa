<template>
  <div class="contacts">
    <AdminBreadcrumb :items="breadcrumb" />
    <div>
      <div v-if="contacts">
        <b-table v-if="contacts.length" :fields="table" :items="contacts" responsive="sm" />
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
      contacts: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Contatos', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'message', label: 'Mensagem' }
      ]
    }
  },
  async created () {
    this.contacts = await this.$axios.$get('/api/contacts')
  }
}
</script>
