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
          <v-btn v-if="media.url" :href="media.url" target="_blank" color="primary">Acessar Conteúdo</v-btn>
          <Documents :documents="media.documents" label="Baixar documentos" />
        </p>
        <div class="tags-component">
          <v-btn v-for="tag in media.tags" :key="tag._id" :to="'/biblioteca?tag=' + tag" size="sm" class="mr-1">
            {{ tag }}
          </v-btn>
        </div>
        <share />
      </div>
    </div>
    <br>
    <div class="text-center">
      <v-btn color="secondary" @click="$router.go(-1)">
        Voltar à biblioteca
      </v-btn>
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
