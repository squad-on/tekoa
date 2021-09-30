<template>
  <v-toolbar dark color="#151621" elevation="0" class="pt-3 mb-10">
    <v-btn
      small
      class="tertiary ml-0"
      icon
      @click="$router.go(-1)"
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
