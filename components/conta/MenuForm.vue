<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <!-- <v-select outlined v-if="parent_menus" label="Menu Principal" v-model="form.menu" :options="parent_menus" label="name" :reduce="item => item._id" messages="Preenchendo, o menu deste cadastro será exibido dentro do Menu Principal, como um Sub-Menu" /> -->
      <v-select v-if="pages" v-model="form.page" outlined :items="pages.map(page => ({value: page._id, text: page.title}))" label="Página" messages="Relacione com uma página existente" @input="setName" />
      <template v-if="!form.page">
        <validation-provider v-slot="{ errors }" name="url">
          <v-text-field v-model="form.url" outlined name="url" label="Ou insira uma URL customizada" :error-messages="errors" messages="Comece com / para páginas internas" />
        </validation-provider>
      </template>
      <validation-provider v-slot="{ errors }" name="nome" rules="required">
        <v-text-field v-model="form.name" outlined name="name" label="Nome que aparece no menu *" :error-messages="errors" />
      </validation-provider>
      <v-btn type="submit" color="success" block :disabled="invalid">
        <b-icon-check-circle /> Salvar
      </v-btn>
    </v-form>
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
          this.$router.push('/conta/menus')
        }
      } else {
        const menu = await this.$axios.$post('/api/menus', this.form)
        if (menu) {
          this.$notifier.success('Menu cadastrado com sucesso.')
          this.$router.push('/conta/menus')
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
    }
  }
}
</script>
