<template>
  <div class="contacts">
    <AdminBreadcrumb :items="breadcrumb" />
    <div v-if="contacts">
      <v-list v-if="contacts.length" color="tertiary" class="rounded">
        <template v-for="(contact, index) in contacts">
          <v-list-item :key="contact._id">
            <v-list-item-content>
              <v-list-item-title>{{ contact.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ contact.email }}</v-list-item-subtitle>
              <div class="mt-3">{{ contact.message }}</div>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>
                {{ $moment(contact.createdAt).format("DD/MM/YYYY") }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < contacts.length - 1"
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
      contacts: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
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
