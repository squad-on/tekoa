<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <MenuForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Menus', to: '/conta/menus' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
