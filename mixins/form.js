export default {
  methods: {
    toForm(form, data) {
      Object.keys(form).forEach((key) => {
        if (data && data[key] !== null && data[key] !== undefined) {
          if (typeof data[key] === 'string' && data[key].includes('T00:00:00.000Z') && key !== 'date_time') {
            form[key] = data[key].replace(/T00:00:00.000Z/g, '')
          } else {
            form[key] = data[key]
          }
        }
      })
      return form
    },
    quillUpload(e) {
      this.selectedFile = e.target.files[0]

      const form = new FormData()
      form.append('file', this.selectedFile)
      this.$axios.$post('/api/uploads/images', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(r => {
        const range = this.$refs.quillEdit.quill.getSelection()
        this.$refs.quillEdit.quill.insertEmbed(range.index, 'image', `${r.average}`)
      }).catch(e => {
        this.$notifier.error('Ocorreu um erro ao enviar a imagem: ' + e.message)
      })
    }
  }
}
