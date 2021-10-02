<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <validation-provider v-slot="{ errors }" name="título" rules="required">
        <v-text-field v-model="form.title" outlined name="title" label="Título *" :error-messages="errors" />
      </validation-provider>
      <v-textarea v-model="form.description" outlined name="description" label="Introdução" />
      <quill-editor ref="quillEdit" v-model="form.content" label="Descrição completa" />
      <input id="quillfile" type="file" hidden @change="quillUpload">
      <Upload v-model="form.picture" type="images" label="Foto de capa" edit-title edit-description edit-link />
      <Upload v-model="form.documents" label="Documentos" type="documents" multiple edit-title />
      <tags-form v-model="form.tags" :current-tags="currentTags" />
      <Save :invalid="invalid" />
    </v-form>
    <Remove v-if="post" @confirm="remove(post)" />
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
    post: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      currentTags: [],
      form: {
        title: '',
        description: '',
        documents: [],
        content: '',
        picture: null,
        tags: []
      }
    }
  },
  async created () {
    this.toForm(this.form, this.post)
    this.currentTags = await this.$axios.$get('/api/posts/current_tags')
  },
  methods: {
    async save () {
      if (this.post) {
        const post = await this.$axios.$put('/api/posts/' + this.post.slug, this.form)
        if (post) {
          this.$notifier.success('Notícia atualizada com sucesso!')
          this.$router.push('/admin/posts')
        }
      } else {
        const post = await this.$axios.$post('/api/posts', this.form)
        if (post) {
          this.$notifier.success('Notícia cadastrada com sucesso!')
          this.$router.push('/admin/posts')
        }
      }
    },
    remove (post) {
      this.$axios.delete('/api/posts/' + post.slug).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/admin/posts')
      })
    }
  }
}
</script>
