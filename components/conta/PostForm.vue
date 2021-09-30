<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <v-row>
        <v-col cols="12" md="12">
          <b-form-group label="Título *">
            <validation-provider v-slot="{ errors }" name="título" rules="required">
              <b-form-input v-model="form.title" name="title" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </v-col>
        <v-col cols="12" md="12">
          <b-form-group label="Introdução">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </v-col>
        <v-col cols="12" md="12">
          <b-form-group label="Descrição completa">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </v-col>
        <v-col cols="12" md="12">
          <Upload v-model="form.picture" type="images" label="Foto de capa" edit-title edit-description edit-link />
        </v-col>
        <v-col cols="12" md="12">
          <Upload v-model="form.documents" label="Documentos" type="documents" multiple edit-title />
        </v-col>
        <v-col cols="12" md="12">
          <tags-form v-model="form.tags" :current-tags="currentTags" />
        </v-col>
      </v-row>
      <v-btn class="mb-4 mt-4" type="submit" color="success" block :disabled="invalid">
        Salvar
      </v-btn>
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
          this.$toast.success('Notícia atualizada com sucesso!')
          this.$router.push('/conta/posts')
        }
      } else {
        const post = await this.$axios.$post('/api/posts', this.form)
        if (post) {
          this.$toast.success('Notícia cadastrada com sucesso!')
          this.$router.push('/conta/posts')
        }
      }
    }
  }
}
</script>
