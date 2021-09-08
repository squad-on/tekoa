<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <UserForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Usuários', to: '/conta/users' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
