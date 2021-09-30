<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <MediaForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Trilhas', to: '/conta/medias' },
        { text: 'Cadastrar item', active: true }
      ]
    }
  }
}
</script>
