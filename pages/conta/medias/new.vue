<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MediaForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Trilhas', to: '/conta/medias' },
        { text: 'Cadastrar item', active: true }
      ]
    }
  }
}
</script>
