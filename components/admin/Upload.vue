<template>
  <div class="mb-6">
    <h5 v-if="label">{{ label }}:</h5>
    <v-list v-if="showPreview && !avatar && preview && preview.length" color="tertiary" class="mb-6">
      <v-list-item v-for="(item, index) in preview" :key="index">
        <v-list-item-avatar>
          <v-img v-if="item.thumb" :src="item.thumb" />
          <v-icon v-else>mdi-paperclip</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <div>
            <v-text-field v-if="editTitle" v-model="item.title" hide-details="auto" dense outlined placeholder="Título" class="mt-1" />
            <v-textarea v-if="editDescription" v-model="item.description" hide-details="auto" dense outlined placeholder="Descrição" class="mt-1" rows="2" />
            <v-text-field v-if="editLink" v-model="item.link" hide-details="auto" dense outlined placeholder="Link" class="mt-1" />
            <v-text-field v-if="editLink" v-model="item.link_title" hide-details="auto" dense outlined placeholder="Título do link" class="mt-1" />
          </div>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon small @click="deleteFile(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-btn v-if="is_loading" color="secondary" disabled large>
      <v-progress-circular indeterminate />
      &nbsp;Enviando arquivos...
    </v-btn>
    <a v-else-if="avatar" @click="upload">
      <v-avatar
        color="tertiary"
        size="6rem"
      >
        <v-img v-if="preview && preview[0] && preview[0].thumb" :src="preview[0].thumb" />
        <v-icon v-else>mdi-camera</v-icon>
      </v-avatar>
    </a>
    <v-btn v-else color="success" @click="upload">
      <v-icon left>mdi-upload</v-icon>
      Enviar {{ type === 'images' ? 'image' + (multiple ? 'ns' : 'm') : 'arquivo' + (multiple ? 's' : '') }}
    </v-btn>
    <p v-if="description" class="text-secondary"><small>{{ description }}</small></p>
    <input
      v-show="false"
      :ref="'uploads-input-' + inputId"
      :multiple="multiple"
      :accept="accept"
      type="file"
      @change="uploadFiles"
    >
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
