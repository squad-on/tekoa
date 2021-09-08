import https from 'https'

export default function ({ $axios, $toast, $auth, app }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  $axios.onError(error => {
    if (error.response) {
      if (error.response.data) {
        if (error.response.status === 401 && error.response.data.includes('invalid signature')) {
          $toast.error('Sessão expirada!')
          $auth.logout()
        } else if (error.response.data.message) {
          $toast.error(error.response.data.message)
        } else if (error.response.data.error) {
          $toast.error(error.response.data.error.message)
        } else {
          $toast.error(error.response.data)
        }
      } else {
        $toast.error(error.response)
      }
    }
  })
}
