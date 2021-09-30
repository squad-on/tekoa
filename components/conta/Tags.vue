<template>
  <div>
    <b-badge v-for="tag in tags" :key="tag" pill color="primary" class="pointer mr-1" @click="$emit('click', tag)">{{ tag }}</b-badge>
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
