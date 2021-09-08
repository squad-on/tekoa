<template>
  <div v-if="items && items.length" class="banners-component">
    <b-carousel :interval="7000" :indicators="items.length > 1" class="banners">
      <template v-for="(item, index) in items">
        <b-carousel-slide v-if="item" :key="index" :img-src="item.url" :img-alt="item.title">
          <h3 v-if="item.title" class="title">{{ item.title }}</h3>
          <p v-if="item.description" class="mb-0">{{ (item.description) | truncate(250) }}</p>
          <template v-if="item.link">
            <b-btn v-if="item.link.startsWith('http')" :href="item.link" target="_blank" variant="secondary" class="mt-md-4 btn-home">{{ item.link_title || 'Saiba mais' }}</b-btn>
            <b-btn v-else :to="item.link" variant="secondary" class="mt-md-4 btn-home">{{ item.link_title || 'Saiba mais' }}</b-btn>
          </template>
        </b-carousel-slide>
      </template>
    </b-carousel>
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
