<template>
  <div class="medias-component">
    <div>
      <div v-if="media.category === 'Vídeos' && media.oembed" v-html="media.oembed" />
      <Banners v-else-if="media.picture" :items="[media.picture]" />
      <div>
        <h3 class="mt-3">{{ media.title }}</h3>
        <small>Publicado em: {{ $moment(media.publishing_date).format(media.publishing_date_format || "DD/MM/YYYY") }} em <n-link :to="'/biblioteca?categoria=' + media.category"><strong>{{ media.category }}</strong></n-link></small>
        <p v-if="media.description" class="mt-3">{{ media.description }}</p>
        <p v-if="media.publishing_house">
          Editora/Fonte: <strong>{{ media.publishing_house }}</strong>
        </p>
        <p v-if="media.category !== 'Notícias' && media.category !== 'Vídeos'">
          <b-button v-if="media.url" :href="media.url" target="_blank" variant="primary">Acessar Conteúdo</b-button>
          <Documents :documents="media.documents" label="Baixar documentos" />
        </p>
        <div class="tags-component">
          <b-button v-for="tag in media.tags" :key="tag._id" :to="'/biblioteca?tag=' + tag" size="sm" class="mr-1">
            {{ tag }}
          </b-button>
        </div>
        <share />
      </div>
    </div>
    <br>
    <div class="text-center">
      <b-button variant="secondary" @click="$router.go(-1)">
        Voltar à biblioteca
      </b-button>
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
