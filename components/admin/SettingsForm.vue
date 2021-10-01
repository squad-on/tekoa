<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <validation-provider v-slot="{ errors }" name="título do site" rules="required">
        <v-text-field v-model="form.title" outlined name="title" label="Nome/Título do site*" :error-messages="errors" />
      </validation-provider>
      <v-textarea v-model="form.description" outlined name="description" label="Descrição curta do site" hint="Um resumo do conteúdo com até 153 caracteres." />
      <v-text-field v-model="form.email" outlined name="email" label="Email de contato" />
      <v-textarea v-model="form.contact" outlined name="contact" label="Outros Contatos" />
      <v-text-field v-model="form.url_facebook" outlined name="url_facebook" label="Link do Facebook" />
      <v-text-field v-model="form.url_twitter" outlined name="url_twitter" label="Link do Twitter" />
      <v-text-field v-model="form.url_instagram" outlined name="url_instagram" label="Link do Instagram" />
      <v-text-field v-model="form.url_youtube" outlined name="url_youtube" label="Link do Youtube" />
      <Upload v-model="form.logo" label="Logo do site" type="images" />
      <Upload v-model="form.favicon" label="Favicon do site" type="images" />
      <Upload v-model="form.banners" label="Banners da home" type="images" description="Envie as imagens na ordem que aparecerão na tela de início" multiple edit-title edit-description edit-link />
      <Save :invalid="invalid" />
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
    settings: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        title: '',
        description: '',
        contact: '',
        email: '',
        logo: null,
        favicon: null,
        banners: [],
        url_facebook: '',
        url_twitter: '',
        url_instagram: '',
        url_youtube: '',
        postal_code: ''
      }
    }
  },
  created () {
    this.toForm(this.form, this.settings)
  },
  methods: {
    async save () {
      const settings = await this.$axios.$post('/api/settings', this.form)
      if (settings) {
        this.$store.commit('updateSettings', settings)
        this.$notifier.success('As configurações foram salvas!')
        this.$router.push('/admin')
      }
    }
  }
}
</script>
