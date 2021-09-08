<template>
  <span class="text-primary">
    <span v-if="items">
      <strong v-if="items.length === 0">Nenhum item encontrado</strong>
      <span v-else-if="items.length === 1"><strong>1</strong> item encontrado</span>
      <span v-else><strong>{{ items.length }}</strong> Itens encontrados</span>
    </span>
    <span v-else>
      <b-spinner small /> Carregando...
    </span>
  </span>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => null
    }
  }
}
</script>
