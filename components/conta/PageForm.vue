<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <v-text-field v-model="form.title" name="title" label="Título" outlined @input="generateSlug" />
      <div v-if="form.title">
        <v-text-field :value="'/' + form.slug" name="slug" label="Url da página" disabled outlined hide-details="auto" />
        <p class="form-text text--secondary">
          <small>
            {{ 'Link que será usado para acessar a página página:' }}
            <n-link :to="'/' + form.slug" target="_blank">{{ '/' + form.slug }} </n-link>
          </small>
        </p>
      </div>
      <tags-form v-model="form.tags" :current-tags="currentTags" />
      <v-textarea v-model="form.description" outlined label="Introdução" name="description" />
      <Upload v-model="form.pictures" label="Banners" type="images" multiple edit-title edit-description edit-link />
      <Upload v-model="form.documents" label="Documentos" type="documents" multiple edit-title />
      <quill-editor ref="quillEdit" v-model="form.content" />
      <input id="quillfile" type="file" hidden @change="quillUpload">
      <v-btn large class="mb-4 mt-4" type="submit" color="success" :disabled="invalid" block>
        Salvar
      </v-btn>
    </v-form>
    <v-btn
      v-if="page"
      fab
      bottom
      right
      fixed
      color="primary"
      @click="remove(page)"
    >
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
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
          this.$notifier.success('Página atualizada com sucesso!')
          this.$router.push('/conta/pages')
        }
      } else {
        const page = await this.$axios.$post('/api/pages', this.form)
        if (page) {
          this.$notifier.success('Página cadastrada com sucesso!')
          this.$router.push('/conta/pages')
        }
      }
    },
    generateSlug() {
      if (this.form.title) {
        this.form.slug = slugify(this.form.title).toLowerCase()
      }
    },
    remove (page) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/pages/' + page.slug).then(() => {
            this.$notifier.success('Página removida com sucesso!')
            this.$router.push('/conta/pages')
          })
        }
      })
    }
  }
}
</script>
