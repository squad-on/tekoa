<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PostForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Desafios', to: '/conta/posts' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
