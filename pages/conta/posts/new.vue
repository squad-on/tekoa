<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <PostForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/conta' },
        { text: 'Desafios', to: '/conta/posts' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
