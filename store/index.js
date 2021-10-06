export const state = () => ({
  settings: null,
  unread_messages: 0
})

export const mutations = {
  updateSettings(state, settings) {
    state.settings = settings
  },
  setUnreadMessages(state, unreadMessages) {
    state.unread_messages = unreadMessages
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
