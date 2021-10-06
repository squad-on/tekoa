<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    scrollable
    @change="form.message = null"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        v-on="on"
        @click="markAsRead"
      >
        <v-badge
          :content="messagesCount"
          :value="messagesCount"
          :color="hasUnreadMessages ? 'red' : 'green'"
          overlap
        >
          <v-icon>mdi-email</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          Conecte-se com <strong> &nbsp;{{ user.name }}</strong>
        </v-toolbar>
        <v-card-text class="pt-6">
          <v-list v-if="conversation && conversation.messages && conversation.messages.length">
            <v-list-item v-for="message in conversation.messages" :key="message._id" class="mr-1 mb-1">
              <v-list-item-avatar color="secondary">
                <template v-if="message.user === user._id">
                  <v-img v-if="user && user.picture && user.picture.url" :src="user.picture.url" />
                  <v-icon v-else>mdi-account</v-icon>
                </template>
                <template v-else>
                  <v-img v-if="$auth.user && $auth.user.picture && $auth.user.picture.url" :src="$auth.user.picture.url" />
                  <v-icon v-else>mdi-account</v-icon>
                </template>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-if="message.user === user._id" class="mb-2">{{ user.name }}</v-list-item-title>
                <v-list-item-title v-else class="mb-2">{{ $auth.user.name }}</v-list-item-title>
                <div>{{ message.message }}</div>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-if="message.createdAt">
                  {{ $moment(message.createdAt).fromNow(true) }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <ValidationObserver v-slot="{ validate, invalid }">
            <v-form @submit.prevent="validate().then(sendMessage(user))">
              <div class="mb-6">
                <validation-provider v-slot="{ errors }" name="mensagem" rules="required">
                  <v-textarea v-model="form.message" name="name" label="Envie uma mensagem" outlined :error-messages="errors" hide-details="auto" />
                </validation-provider>
              </div>
              <div class="text-right">
                <v-btn
                  text
                  @click="dialog.value = false"
                >
                  Fechar
                </v-btn>
                <v-btn type="submit" color="success" :disabled="invalid || !form.message" large>
                  <v-icon left>mdi-send</v-icon>
                  Enviar mensagem
                </v-btn>
              </div>
            </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    user: {
      type: Object,
      default: null,
      required: true
    }
  },
  data () {
    return {
      form: {
        message: null
      },
      conversation: null
    }
  },
  computed: {
    messagesCount() {
      if (this.conversation && this.conversation.messages) {
        return this.conversation.messages.length
      }
      return 0
    },
    hasUnreadMessages() {
      if (this.conversation && this.conversation.messages) {
        return this.conversation.messages.find(message => message.user !== this.$auth.user._id && !message.read)
      }
      return false
    }
  },
  created() {
    this.loadConversation()
  },
  methods: {
    async loadConversation() {
      this.conversation = await this.$axios.$get('/api/conversations/' + this.user._id)
    },
    async markAsRead() {
      if (this.conversation && this.hasUnreadMessages) {
        this.conversation = await this.$axios.$put('/api/conversations/' + this.conversation._id + '/mark_as_read')
      }
    },
    async sendMessage() {
      if (this.user && this.form.message) {
        const message = await this.$axios.$put('/api/conversations/' + this.user._id, { message: this.form.message })
        if (message) {
          this.form.message = null
          this.$notifier.success('Sua mensagem foi enviada.')
          this.loadConversation()
        }
      }
    }
  }
}
</script>
