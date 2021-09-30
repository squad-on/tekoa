<template>
  <div class="events-page">
    <Breadcrumb
      active="Reconhecimento"
    />
    <section class="content pb-5">
      <Page slug="agenda" />
      <v-container>
        <br>
        <div v-if="events">
          <calendar :events="events" />
        </div>
      </v-container>
      <share />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: null
    }
  },
  async created() {
    this.events = await this.$axios.$get('/api/events')
  }
}
</script>
