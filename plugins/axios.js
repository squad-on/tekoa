import https from 'https'

export default function ({ $axios, $notifier, $auth, app }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  $axios.onError(error => {
    if (error.response) {
      if (error.response.data) {
        if (error.response.status === 401 && error.response.data.includes('invalid signature')) {
          $notifier.error('Sessão expirada!')
          $auth.logout()
        } else if (error.response.data.message) {
          $notifier.error(error.response.data.message)
        } else if (error.response.data.error) {
          $notifier.error(error.response.data.error.message)
        } else {
          $notifier.error(error.response.data)
        }
      } else {
        $notifier.error(error.response)
      }
    }
  })
}
