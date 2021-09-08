<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MenuForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Menus', to: '/conta/menus' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
