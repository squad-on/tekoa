<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-form-group label="Menu Principal">
        <v-select v-if="parent_menus" v-model="form.menu" :options="parent_menus" label="name" :reduce="item => item._id" />
        <small tabindex="-1" class="form-text text-muted">Preenchendo, o menu deste cadastro será exibido dentro do Menu Principal, como um Sub-Menu.</small>
      </b-form-group>
      <b-form-group v-if="pages" label="Relacione com uma página existente">
        <v-select v-model="form.page" :options="pages" label="title" :reduce="item => item._id" @input="setName" />
      </b-form-group>
      <b-form-group v-if="!form.page" label="Ou insira uma URL customizada">
        <validation-provider v-slot="{ errors }" name="url">
          <b-form-input v-model="form.url" name="url" />
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
        <small tabindex="-1" class="form-text text-muted">Comece com / para páginas internas.</small>
      </b-form-group>
      <b-form-group label="Nome que aparece no menu *">
        <validation-provider v-slot="{ errors }" name="nome" rules="required">
          <b-form-input v-model="form.name" name="name" />
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
      </b-form-group>
      <b-button type="submit" variant="success" block :disabled="invalid">
        <b-icon-check-circle /> Salvar
      </b-button>
    </b-form>
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
          this.$toast.success('Menu atualizado com sucesso.')
          this.$router.push('/conta/menus')
        }
      } else {
        const menu = await this.$axios.$post('/api/menus', this.form)
        if (menu) {
          this.$toast.success('Menu cadastrado com sucesso.')
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
