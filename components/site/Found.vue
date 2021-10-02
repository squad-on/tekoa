<template>
  <div class="text--secondary mb-3">
    <span v-if="items">
      <strong v-if="items.length === 0">Nenhum item encontrado</strong>
      <span v-else-if="items.length === 1"><strong>1</strong> item encontrado</span>
      <span v-else><strong>{{ items.length }}</strong> Itens encontrados</span>
      <span v-if="category" class="text-primary"> em <strong>{{ category }}</strong>
      </span>
    </span>
    <div v-else>
      <v-skeleton-loader
        v-if="loader"
        :type="loader"
      />
      <v-progress-circular v-else indeterminate small />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => null
    },
    loader: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: null
    }
  }
}
</script>
