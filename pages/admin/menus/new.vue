<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <MenuForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Menus', to: '/admin/menus' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
