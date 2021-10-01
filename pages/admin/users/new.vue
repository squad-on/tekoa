<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <UserForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Usuários', to: '/admin/users' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
