<template>
  <div class="users">
    <AdminBreadcrumb :items="breadcrumb" />
    <div class="text-right mb-3">
      <v-btn color="success" to="/conta/users/new">
        <b-icon-plus /> Cadastrar
      </v-btn>
    </div>
    <div v-if="users">
      <b-table v-if="users.length" :fields="table" :items="users" responsive="sm">
        <template v-slot:cell(role)="data">
          {{ optionText(data.value, 'roles') }}
        </template>
        <template v-slot:cell(actions)="data">
          <n-link class="btn btn-info btn-sm" :to="'/conta/users/' + data.item._id + '/edit'">
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
</template>

<script>

import { optionText } from '@/utils'

export default {
  layout: 'conta',

  data () {
    return {
      optionText,
      users: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Usuários', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Perfil' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.users = await this.$axios.$get('/api/users')
    },
    remove (user) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(confirmed => {
        if (confirmed) {
          this.$axios.$delete('/api/users/' + user._id).then(res => {
            this.list()
            this.$notifier.success('Usuário removido com sucesso!')
          })
        }
      })
    }

  }
}
</script>
