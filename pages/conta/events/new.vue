<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <EventForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Eventos', to: '/conta/events' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
