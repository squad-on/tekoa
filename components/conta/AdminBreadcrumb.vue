<template>
  <v-toolbar dark color="#151621" elevation="0" class="pt-3 mb-8">
    <v-btn
      v-if="items.filter(item => item.to).length"
      small
      class="tertiary ml-n4"
      icon
      :to="items.filter(item => item.to).slice(-1)[0].to"
    >
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-toolbar-title>
      <v-breadcrumbs class="pl-0" :items="items.filter(item => item.to != '/conta').map(item => ({
        text: item.text, to: item.to, exact: true
      }))"
      />
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => null
    }
  },
  computed: {
    active () {
      return this.items.find(item => item.active).text
    }
  },
  created() {
    // this.$store.commit('setPageTitle', this.pageTitle())
    // this.$store.commit('setPageDescription', this.pageDescription())
  }
}
</script>
