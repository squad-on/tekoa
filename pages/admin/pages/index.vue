<template>
  <div class="pages">
    <AdminBreadcrumb :items="breadcrumb" />
    <v-btn
      to="/admin/pages/new"
      fab
      bottom
      right
      fixed
      color="success"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="pages">
      <v-list v-if="pages.length" color="tertiary" class="rounded">
        <template v-for="(page, index) in pages">
          <v-list-item :key="page._id" :to="'/admin/pages/' + page.slug + '/edit'">
            <v-list-item-content>
              <v-list-item-title>{{ page.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ '/' + page.slug }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < pages.length - 1"
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
      pages: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
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
    }
  }
}
</script>
