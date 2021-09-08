<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <EventForm v-if="event" :event="event" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      event: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Eventos', to: '/conta/events' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.event = await this.$axios.$get('/api/events/' + this.$route.params.id)
  }
}
</script>
