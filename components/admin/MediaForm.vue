<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <validation-provider v-slot="{ errors }" name="categoria" rules="required">
        <v-select v-model="form.category" name="category" :items="categories" label="Categoria *" :error-messages="errors" outlined />
      </validation-provider>
      <div v-if="form.category">
        <v-text-field v-model="form.url" outlined label="Link do vídeo" @input="loadUrl" />
        <v-progress-circular v-if="loadingUrl" indeterminate small label="Carregando vídeo" />
        <div v-if="form.oembed && !loadingUrl" class="mb-6" v-html="form.oembed" />
        <Upload v-model="form.documents" label="Ou envie os arquivos" type="documents" multiple edit-title @uploaded="fileUploaded" />
        <validation-provider v-slot="{ errors }" name="título" rules="required">
          <v-text-field v-model="form.title" outlined name="title" label="Título *" :error-messages="errors" />
        </validation-provider>
        <v-textarea v-model="form.description" outlined name="description" label="Descrição" />
        <tags-form v-model="form.tags" :current-tags="currentTags" />
        <v-row>
          <v-col cols="12" md="6">
            <DatePicker v-model="form.publishing_date" label="Data da publicação" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="form.publishing_date_format" :items="dateFormatOptions" label="Formato da data" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.publishing_house" outlined label="Editora/Fonte" hint="Veículo de comunicação onde foi publicado" />
          </v-col>
        </v-row>
        <Save :invalid="invalid" />
      </div>
    </v-form>
    <Remove v-if="media" @confirm="remove(media)" />
  </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import mixinForm from '@/mixins/form'
import categories from '@/data/categories.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    media: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      categories,
      changePicture: false,
      loadingUrl: false,
      currentTags: [],
      dateFormatOptions: [
        'DD/MM/YYYY',
        'MM/YYYY',
        'YYYY'
      ],
      form: {
        category: '',
        documents: [],
        picture: null,
        title: '',
        description: '',
        tags: [],
        url: '',
        oembed: '',
        publishing_date: null,
        publishing_date_format: 'DD/MM/YYYY',
        publishing_house: ''
      }
    }
  },
  async created() {
    this.toForm(this.form, this.media)
    this.currentTags = await this.$axios.$get('/api/medias/tags')
  },
  methods: {
    async save() {
      if (this.media) {
        const media = await this.$axios.$put('/api/medias/' + this.media._id, this.form)
        if (media) {
          this.$notifier.success('Item atualizado com sucesso!')
          this.$router.push('/admin/medias')
        }
      } else {
        const media = await this.$axios.$post('/api/medias', this.form)
        if (media) {
          this.$notifier.success('Item cadastrado com sucesso!')
          this.$router.push('/admin/medias')
        }
      }
    },
    fileUploaded(doc) {
      if (doc.average) {
        this.form.picture = {
          url: doc.average,
          average: doc.average,
          thumb: doc.thumb
        }
      }
    },
    async loadUrl() {
      if (this.isValidUrl(this.form.url)) {
        this.loadingUrl = true
        const res = await this.$axios.$get('/api/uploads/oembed?url=' + encodeURI(this.form.url)).catch((e) => {
          this.loadingUrl = false
        })
        if (res) {
          this.form.title = res.title
          if (res.description) {
            this.form.description = res.description
            const tags = res.description.split(' ').filter(v => v.startsWith('#')).map(v => v.replace('#', ''))
            if (tags && tags.length) {
              this.form.tags = tags
            }
          } else {
            this.form.description = ''
          }
          if (res.thumbnail_url) {
            this.form.picture = {
              url: res.thumbnail_url,
              thumb: res.thumbnail_url,
              average: res.thumbnail_url
            }
          } else {
            this.form.picture = null
          }
          if (!res.html || res.html.includes('iframely-embed')) {
            this.form.oembed = undefined
          } else {
            this.form.oembed = res.html
          }
          this.form.publishing_house = res.provider_name
        }
        this.loadingUrl = false
      }
    },
    isValidUrl (string) {
      let url = false
      try {
        url = new URL(string)
      } catch (_) {
        return url
      }
      return url
    },
    remove (media) {
      this.$axios.delete('/api/medias/' + media._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/admin/medias')
      })
    }
  }
}
</script>
