<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <v-row>
        <v-col cols="12" md="12">
          <b-form-group label="Título">
            <b-form-input v-model="form.title" name="title" @input="generateSlug" />
          </b-form-group>
        </v-col>
        <v-col cols="12" md="12">
          <b-form-group v-if="form.title" label="Url da página" disabled>
            <b-form-input :value="'/' + form.slug" name="slug" />
            <small class="form-text text-muted">
              {{ 'Link que será usado para acessar a página página:' }}
              <n-link :to="'/' + form.slug" target="_blank">{{ '/' + form.slug }} </n-link>
            </small>
          </b-form-group>
        </v-col>
        <v-col cols="12" md="12">
          <tags-form v-model="form.tags" :current-tags="currentTags" />
        </v-col>
        <v-col cols="12" md="12">
          <b-form-group label="Introdução">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </v-col>
        <v-col cols="12" md="12">
          <Upload v-model="form.pictures" label="Banners" type="images" multiple edit-title edit-description edit-link />
        </v-col>
        <v-col cols="12" md="12">
          <Upload v-model="form.documents" label="Documentos" type="documents" multiple edit-title />
        </v-col>
        <v-col cols="12" md="12">
          <b-form-group label="Conteúdo da página">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </v-col>
      </v-row>
      <v-btn class="mb-4 mt-4" type="submit" color="success" :disabled="invalid" block>
        Salvar
      </v-btn>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import slugify from 'slugify'

import mixinForm from '@/mixins/form'
export default {
  components: {
    ValidationObserver
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
          this.$toast.success('Página atualizada com sucesso!')
          this.$router.push('/conta/pages')
        }
      } else {
        const page = await this.$axios.$post('/api/pages', this.form)
        if (page) {
          this.$toast.success('Página cadastrada com sucesso!')
          this.$router.push('/conta/pages')
        }
      }
    },
    generateSlug() {
      if (this.form.title) {
        this.form.slug = slugify(this.form.title).toLowerCase()
      }
    }
  }
}
</script>
