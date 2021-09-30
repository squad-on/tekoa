<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <UserForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Usuários', to: '/conta/users' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
