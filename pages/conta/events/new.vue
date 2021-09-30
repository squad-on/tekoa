<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <EventForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Eventos', to: '/conta/events' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
