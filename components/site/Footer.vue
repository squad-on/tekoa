<template>
  <div class="footer pt-5 pb-5 bg-primary">
    <footer v-if="settings">
      <b-container fluid="lg">
        <b-row>
          <b-col sm="6">
            <a>
              {{ settings.title.toUpperCase() }}
            </a>
            <div v-if="settings.contact" class="mt-4 pre-line">
              <small>{{ settings.contact }}</small>
            </div>
            <div v-if="settings.email">
              <a :href="'mailto:' + settings.email">{{ settings.email }}</a>
            </div>
            <div>
              <a v-if="settings.url_facebook" :href="settings.url_facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook-square']" /></a>
              <a v-if="settings.url_instagram" :href="settings.url_instagram" target="_blank"><font-awesome-icon :icon="['fab', 'instagram-square']" /></a>
              <a v-if="settings.url_twitter" :href="settings.url_twitter" target="_blank"><font-awesome-icon :icon="['fab', 'twitter-square']" /></a>
              <a v-if="settings.url_youtube" :href="settings.url_youtube" target="_blank"><font-awesome-icon :icon="['fab', 'youtube-square']" /></a>
            </div>
            <div class="mt-4">
              <small>&copy; {{ settings.title }}. Todos os direitos reservados.</small>
            </div>
          </b-col>
          <b-col sm="6" class="">
            <a>
              CONTATO
            </a>
            <Contact />
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_contact: false,
      show_partners: false
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  }
}
</script>
