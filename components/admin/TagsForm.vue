<template>
  <v-combobox
    v-model="tags"
    :items="currentTags"
    :search-input.sync="search"
    hide-selected
    label="Palavras chave"
    multiple
    persistent-hint
    small-chips
    outlined
    @input="changed"
  >
    <template #no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Nenhum resultado para "<strong>{{ search }}</strong>". Pressione <kbd>enter</kbd> para adicionar
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    currentTags: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tags: [],
      search: null
    }
  },
  created () {
    this.tags = this.value
  },
  methods: {
    changed () {
      this.$emit('input', this.tags)
    }
  }
}
</script>
