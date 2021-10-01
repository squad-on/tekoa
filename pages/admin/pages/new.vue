<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <PageForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Páginas', to: '/admin/pages' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
