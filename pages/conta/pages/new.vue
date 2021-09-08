<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Páginas', to: '/conta/pages' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
