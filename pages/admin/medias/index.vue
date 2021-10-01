<template>
  <div>
    <AdminBreadcrumb :items="breadcrumb" />
    <v-btn
      to="/admin/medias/new"
      fab
      bottom
      right
      fixed
      color="success"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="medias">
      <v-list v-if="medias.length" color="tertiary" class="rounded">
        <template v-for="(media, index) in medias">
          <v-list-item :key="media._id" :to="'/admin/medias/' + media._id + '/edit'">
            <v-list-item-avatar v-if="media.picture">
              <v-img :src="media.picture.thumb || media.picture.url" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ media.title }}</v-list-item-title>
              <v-list-item-subtitle v-if="media.tags && media.tags.length">
                <tags :tags="media.tags" />
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text v-if="media.publishing_date">
                {{ $moment(media.publishing_date).format(media.publishing_date_format || "DD/MM/YYYY") }}
              </v-list-item-action-text>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < medias.length - 1"
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
  data() {
    return {
      medias: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
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
            this.$notifier.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
