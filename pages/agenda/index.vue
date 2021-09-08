<template>
  <div class="events-page">
    <Breadcrumb
      active="Reconhecimento"
    />
    <section class="content pb-5">
      <Page slug="agenda" />
      <b-container>
        <br>
        <div v-if="events">
          <calendar :events="events" />
        </div>
      </b-container>
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
