<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <!-- <v-select v-if="parent_menus" v-model="form.menu" outlined label="Menu pai" item-text="name" item-value="_id" :items="parent_menus" messages="Preenchendo, o menu deste cadastro será exibido dentro do Menu pai, como um Sub-Menu" clearable /> -->
      <v-select v-if="pages" v-model="form.page" outlined :items="pages" item-text="title" item-value="_id" label="Página" messages="Relacione com uma página existente" clearable @input="setName" />
      <template v-if="!form.page">
        <validation-provider v-slot="{ errors }" name="url">
          <v-text-field v-model="form.url" outlined name="url" label="Ou insira uma URL customizada" :error-messages="errors" messages="Comece com / para páginas internas" />
        </validation-provider>
      </template>
      <validation-provider v-slot="{ errors }" name="nome" rules="required">
        <v-text-field v-model="form.name" outlined name="name" label="Nome que aparece no menu *" :error-messages="errors" />
      </validation-provider>
      <Save :invalid="invalid" />
    </v-form>
    <Remove v-if="menu" @confirm="remove(menu)" />
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import mixinForm from '@/mixins/form'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    menu: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      parent_menus: [],
      pages: null,
      form: {
        name: '',
        url: '',
        page: null,
        menu: null
      }
    }
  },
  async created () {
    this.toForm(this.form, this.menu)
    this.parent_menus = await this.$axios.$get('/api/menus')
    this.pages = await this.$axios.$get('/api/pages')
  },
  methods: {
    async save () {
      if (this.menu) {
        const menu = await this.$axios.$put('/api/menus/' + this.menu.id, this.form)
        if (menu) {
          this.$notifier.success('Menu atualizado com sucesso.')
          this.$router.push('/admin/menus')
        }
      } else {
        const menu = await this.$axios.$post('/api/menus', this.form)
        if (menu) {
          this.$notifier.success('Menu cadastrado com sucesso.')
          this.$router.push('/admin/menus')
        }
      }
    },
    setName(pageId) {
      if (pageId) {
        const page = this.pages.find(page => page._id === pageId)
        if (page) {
          this.form.name = page.title
        }
      }
    },
    remove (menu) {
      this.$axios.delete('/api/menus/' + menu._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/admin/menus')
      })
    }

  }
}
</script>
