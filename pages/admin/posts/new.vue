<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <PostForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Desafios', to: '/admin/posts' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
