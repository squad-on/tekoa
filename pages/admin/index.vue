<template>
  <div class="dashboard">
    <AdminBreadcrumb :items="breadcrumb" />
    <!-- <AdminMenu /> -->
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: this.$auth.user.role === 'user' ? 'Minha conta' : 'Dashboard', active: true }
      ]
    }
  }
}
</script>
