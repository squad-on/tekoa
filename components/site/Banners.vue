<template>
  <div v-if="items && items.length" class="mb-6">
    <v-carousel :show-arrows="items.length > 1" :hide-delimiters="items.length < 2" hide-delimiter-background>
      <template v-for="(item, index) in items">
        <v-carousel-item v-if="item" :key="index" :src="item.url" :alt="item.title">
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-center">
              <h2 v-if="item.title" class="text-h4">{{ item.title }}</h2>
              <p v-if="item.description" class="mb-0 d-none d-md-block">{{ (item.description) | truncate(250) }}</p>
              <template v-if="item.link">
                <v-btn v-if="item.link.startsWith('http')" :href="item.link" target="_blank" color="secondary" class="mt-md-4 btn-home">{{ item.link_title || 'Saiba mais' }}</v-btn>
                <v-btn v-else :to="item.link" color="secondary" class="mt-md-4 btn-home">{{ item.link_title || 'Saiba mais' }}</v-btn>
              </template>
            </div>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
