<template>
  <div class="users">
    <AdminBreadcrumb :items="breadcrumb" />
    <v-btn
      to="/admin/users/new"
      fab
      bottom
      right
      fixed
      color="success"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="users">
      <v-list v-if="users.length" color="tertiary" class="rounded">
        <template v-for="(user, index) in users">
          <v-list-item :key="user._id" :to="'/admin/users/' + user._id + '/edit'">
            <v-list-item-avatar v-if="user.picture">
              <v-img :src="user.picture.thumb || user.picture.url" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ optionText(user.role, 'roles') }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < users.length - 1"
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

import { optionText } from '@/utils'

export default {
  layout: 'admin',

  data () {
    return {
      optionText,
      users: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
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
