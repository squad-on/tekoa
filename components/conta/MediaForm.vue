<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-form-group label="Categoria *">
        <validation-provider v-slot="{ errors }" name="categoria" rules="required">
          <b-form-select v-model="form.category" name="category" :options="categories">
            <template v-slot:first>
              <b-form-select-option value="" disabled>-- Selecione uma categoria --</b-form-select-option>
            </template>
          </b-form-select>
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
      </b-form-group>
      <div v-if="form.category">
        <div v-if="form.category">
          <b-form-group label="Link do vídeo">
            <b-form-input v-model="form.url" @input="loadUrl" />
            <b-spinner v-if="loadingUrl" small label="Carregando vídeo" />
            <div v-if="form.oembed && !loadingUrl" class="mt-3" v-html="form.oembed" />
            <Upload v-model="form.documents" label="Ou envie os arquivos" type="documents" multiple edit-title @uploaded="fileUploaded" />
          </b-form-group>
        </div>
        <div>
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
              <b-form-group label="Descrição">
                <b-form-textarea v-model="form.description" name="description" />
              </b-form-group>
            </v-col>
            <v-col cols="12" md="12">
              <tags-form v-model="form.tags" :current-tags="currentTags" />
            </v-col>
            <v-col cols="12" md="6">
              <b-form-group label="Data da publicação">
                <b-form-datepicker v-model="form.publishing_date" />
              </b-form-group>
            </v-col>
            <v-col cols="12" md="6">
              <b-form-group label="Formato da data">
                <b-form-select v-model="form.publishing_date_format" :options="dateFormatOptions" />
              </b-form-group>
            </v-col>
            <v-col cols="12" md="6">
              <b-form-group label="Editora/Fonte" description="Veículo de comunicação onde foi publicado">
                <b-form-input v-model="form.publishing_house" />
              </b-form-group>
            </v-col>
          </v-row>
          <v-btn class="mb-4 mt-4" type="submit" color="success" block :disabled="invalid">
            Salvar
          </v-btn>
        </div>
      </div>
    </b-form>
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
      dateFormatOptions: {
        'DD/MM/YYYY': 'Dia/Mês/Ano',
        'MM/YYYY': 'Mês/Ano',
        YYYY: 'Ano'
      },
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
    this.currentTags = await this.$axios.$get('/api/medias/current_tags')
  },
  methods: {
    async save() {
      if (this.media) {
        const media = await this.$axios.$put('/api/medias/' + this.media._id, this.form)
        if (media) {
          this.$toast.success('Item atualizado com sucesso!')
          this.$router.push('/conta/medias')
        }
      } else {
        const media = await this.$axios.$post('/api/medias', this.form)
        if (media) {
          this.$toast.success('Item cadastrado com sucesso!')
          this.$router.push('/conta/medias')
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
    }
  }
}
</script>
