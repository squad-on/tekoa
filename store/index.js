export const state = () => ({
  settings: null
})

export const mutations = {
  updateSettings(state, settings) {
    state.settings = settings
  }
}

export const actions = {
  async nuxtServerInit({
    commit,
    state
  }, { $axios, req }) {
    if (!state.settings) {
      const data = await $axios.$get('/api/settings')
      if (data) {
        commit('updateSettings', data)
      }
    }
  }
}
