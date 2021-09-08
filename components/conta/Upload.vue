<template>
  <div>
    <b-form-group
      :label="label"
      :description="description"
    >
      <div v-if="showPreview && !avatar && preview && preview.length">
        <table class="table b-table b-table-stacked-sm mb-1">
          <tbody>
            <tr v-for="(item, index) in preview" :key="index">
              <td style="width: 100px;">
                <a :href="item.url" target="_blank">
                  <b-img v-if="item.thumb" :src="item.thumb" fluid thumbnail width="100" />
                  <b-icon-image v-else-if="type === 'images'" scale="2" />
                  <b-icon-file-earmark-text v-else scale="2" />
                </a>
              </td>
              <td v-if="editTitle || editDescription || editLink">
                <b-form-input v-if="editTitle" v-model="item.title" placeholder="Título" class="mt-1" />
                <b-form-textarea v-if="editDescription" v-model="item.description" placeholder="Descrição" class="mt-1" />
                <b-form-input v-if="editLink" v-model="item.link" placeholder="Link" class="mt-1" />
                <b-form-input v-if="editLink" v-model="item.link_title" placeholder="Título do link" class="mt-1" />
              </td>
              <td v-if="editDescription" />
              <td class="text-md-right">
                <b-btn variant="light" size="sm" @click="deleteFile(index)">
                  <b-icon-trash />
                </b-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-button v-if="is_loading" variant="secondary" disabled>
        <b-spinner small />
        Enviando arquivos...
      </b-button>
      <a v-else-if="avatar" @click="upload">
        <b-avatar
          size="6rem"
          :src="preview && preview[0] && preview[0].thumb ? preview[0].thumb : null"
        >
          <template #badge><b-icon-camera /></template>
        </b-avatar>
      </a>
      <b-btn v-else variant="success" @click="upload">
        <b-icon-upload />
        Enviar {{ type === 'images' ? 'image' + (multiple ? 'ns' : 'm') : 'arquivo' + (multiple ? 's' : '') }}
      </b-btn>
      <input
        v-show="false"
        :ref="'uploads-input-' + inputId"
        :multiple="multiple"
        :accept="accept"
        type="file"
        @change="uploadFiles"
      >
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Object, Array],
      default: () => null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Arquivos'
    },
    description: {
      type: String,
      default: null
    },
    type: {
      type: String,
      required: true
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: false
    },
    editTitle: {
      type: Boolean,
      default: false
    },
    editDescription: {
      type: Boolean,
      default: false
    },
    editLink: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      is_loading: false
    }
  },
  computed: {
    inputId() {
      return Math.random().toString(36).substring(2, 15)
    },
    accept() {
      if (this.type === 'documents') {
        return 'application/msword, application/vnd.google-earth.kml+xml, image/*, application/pdf'
      } else if (this.type === 'images') {
        return 'image/*'
      }
      return null
    },
    preview() {
      if (Array.isArray(this.value)) {
        return this.value
      } else if (this.value) {
        return [this.value]
      }
      return []
    }
  },
  methods: {
    uploadFiles(e) {
      this.is_loading = true
      const files = e.target.files || e.dataTransfer.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file, file.name)
        this.$axios
          .$post('/api/uploads/' + this.type, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((uploaded) => {
            if (this.multiple) {
              let ret = [uploaded]
              if (this.value) {
                ret = this.value.concat(uploaded)
              }
              this.$emit('input', ret)
            } else {
              this.$emit('input', uploaded)
            }
            this.$emit('uploaded', uploaded)
            this.is_loading = false
          })
      }
    },
    deleteFile(index) {
      if (this.multiple) {
        this.$emit(
          'input',
          this.value.filter((item, i) => i !== index)
        )
      } else {
        this.$emit('input', null)
      }
    },
    upload() {
      // eslint-disable-next-line dot-notation
      this.$refs['uploads-input-' + this.inputId].click()
    }
  }
}
</script>
