<template>
  <div class="menus">
    <AdminBreadcrumb :items="breadcrumb" />
    <v-btn
      to="/admin/menus/new"
      fab
      bottom
      right
      fixed
      color="success"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="menus">
      <v-list v-if="menus.length" color="tertiary" class="rounded">
        <template v-for="(menu, index) in menus">
          <v-list-item :key="menu._id" :to="'/admin/menus/' + menu._id + '/edit'">
            <v-list-item-content>
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <template v-if="menu.page">
                  <n-link :to="'/' + menu.page.slug">{{ '/' + menu.page.slug }}</n-link>
                </template>
                <template v-else>
                  <a v-if="menu.url.startsWith('http')" :href="menu.url" target="_blank">{{ menu.url }}</a>
                  <n-link v-else :to="menu.url">{{ menu.url }}</n-link>
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-for="child in menu.children" :key="child._id" :to="'/admin/menus/' + child._id + '/edit'" class="ml-6">
            <v-list-item-content>
              <v-list-item-title>{{ child.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <template v-if="child.page">
                  <n-link :to="'/' + child.page.slug">{{ '/' + child.page.slug }}</n-link>
                </template>
                <template v-else>
                  <a v-if="child.url.startsWith('http')" :href="child.url" target="_blank">{{ child.url }}</a>
                  <n-link v-else :to="child.url">{{ child.url }}</n-link>
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < menus.length - 1"
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
      menus: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Menus', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'menu', label: 'Página' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.menus = await this.$axios.$get('/api/menus', { params: { populate: 'menu' } })
    },
    remove (menu) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/menus/' + menu._id).then(() => {
            this.list()
            this.$notifier.success('Menu removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
