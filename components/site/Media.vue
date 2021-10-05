<template>
  <div class="medias-component">
    <div>
      <div v-if="media.oembed" class="mb-6" v-html="media.oembed" />
      <Banners v-else-if="media.picture" :items="[media.picture]" />
      <div>
        <p><small>Trilha: <n-link :to="'/trilhas?categoria=' + media.category"><strong>{{ media.category }}</strong></n-link></small></p>
        <p><small>Publicado em: {{ $moment(media.publishing_date).format(media.publishing_date_format || "DD/MM/YYYY") }}</small></p>
        <p v-if="media.description" class="mt-3">{{ media.description }}</p>
        <Documents :documents="media.documents" label="Baixar documentos" />
        <p v-if="media.publishing_house">
          <small>
            Fonte:
            <v-icon>{{ `mdi-${media.publishing_house.toLowerCase()}` }}</v-icon>
            <a :href="media.url" target="_blank">
              <strong>{{ media.publishing_house }}</strong>
            </a>
          </small>
        </p>
        <Tags :tags="media.tags" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
