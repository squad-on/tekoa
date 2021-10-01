<template>
  <div>
    <div v-if="medias">
      <v-row v-if="medias.length">
        <v-col v-for="media in medias" :key="media._id" sm="4" md="3">
          <v-card :to="'/trilhas/' + media._id" color="tertiary">
            <v-img v-if="media.picture" :src="media.picture ? media.picture.thumb : null" :alt="media.title" :aspect-ratio="16/9" />
            <v-card-title class="secondary--text">
              {{ media.title }}
            </v-card-title>
            <v-card-text>
              <tags :tags="media.tags" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-alert v-else color="tertiary" class="text-center">
        Nenhuma trilha encontrada
      </v-alert>
    </div>
    <v-row v-else class="mb-6">
      <v-col v-for="i in 4" :key="i" md="3">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    medias: {
      type: Array,
      default: () => []
    }
  }
}
</script>
