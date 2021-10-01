<template>
  <div>
    <v-chip v-for="tag in tags" :key="tag" x-small class="pointer mr-1" @click="$emit('click', tag)">{{ tag }}</v-chip>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>
