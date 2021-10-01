<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <validation-provider v-slot="{ errors }" name="título" rules="required">
        <v-text-field v-model="form.title" name="title" label="Título" outlined :error-messages="errors" @input="generateSlug" />
      </validation-provider>
      <div v-if="form.title">
        <v-text-field :value="'/' + form.slug" name="slug" label="Url da página" disabled outlined hide-details="auto" />
        <p class="form-text text--secondary">
          <small>
            {{ 'Link que será usado para acessar a página página:' }}
            <n-link :to="'/' + form.slug" target="_blank">{{ '/' + form.slug }} </n-link>
          </small>
        </p>
      </div>
      <v-textarea v-model="form.description" outlined label="Introdução" name="description" />
      <quill-editor ref="quillEdit" v-model="form.content" />
      <input id="quillfile" type="file" hidden @change="quillUpload">
      <tags-form v-model="form.tags" :current-tags="currentTags" />
      <Upload v-model="form.pictures" label="Banners" type="images" multiple edit-title edit-description edit-link />
      <Upload v-model="form.documents" label="Documentos" type="documents" multiple edit-title />
      <Save :invalid="invalid" />
    </v-form>
    <Remove v-if="page" @confirm="remove(page)" />
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import slugify from 'slugify'

import mixinForm from '@/mixins/form'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    page: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      currentTags: [],
      form: {
        slug: null,
        title: '',
        documents: [],
        description: '',
        categories: [],
        content: '',
        pictures: [],
        tags: []
      }
    }
  },
  async created () {
    this.toForm(this.form, this.page)
    this.currentTags = await this.$axios.$get('/api/pages/current_tags')
  },
  methods: {
    async save () {
      if (this.page) {
        const page = await this.$axios.$put('/api/pages/' + this.page.slug, this.form)
        if (page) {
          this.$notifier.success('Página atualizada com sucesso!')
          this.$router.push('/admin/pages')
        }
      } else {
        const page = await this.$axios.$post('/api/pages', this.form)
        if (page) {
          this.$notifier.success('Página cadastrada com sucesso!')
          this.$router.push('/admin/pages')
        }
      }
    },
    generateSlug() {
      if (this.form.title) {
        this.form.slug = slugify(this.form.title).toLowerCase()
      }
    },
    remove (page) {
      this.$axios.delete('/api/pages/' + page.slug).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/admin/pages')
      })
    }
  }
}
</script>
