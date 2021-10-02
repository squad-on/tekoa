<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <MediaForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Trilhas', to: '/admin/medias' },
        { text: 'Cadastrar item', active: true }
      ]
    }
  }
}
</script>
