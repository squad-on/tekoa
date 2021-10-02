export default ({ app, store }, inject) => {
  inject('notifier', {
    notify({ content = '', color = 'success' }) {
      store.commit('snackbar/showMessage', { content, color })
    },
    success(content) {
      store.commit('snackbar/showMessage', { content, color: 'success' })
    },
    error(content) {
      store.commit('snackbar/showMessage', { content, color: 'red' })
    }
  })
}
