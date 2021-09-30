<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <PageForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Páginas', to: '/conta/pages' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
