<template>
  <div class="contact-component text-left mt-3">
    <ValidationObserver v-slot="{ validate, invalid }">
      <v-form @submit.prevent="validate().then(save)">
        <v-row>
          <v-col cols="12" md="6">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <v-text-field v-model="form.name" name="name" label="Digite seu nome" outlined :error-messages="errors" hide-details="auto" dense />
            </validation-provider>
          </v-col>
          <v-col cols="12" md="6">
            <validation-provider v-slot="{ errors }" name="email" rules="required|email">
              <v-text-field v-model="form.email" name="email" label="Digite seu email" outlined :error-messages="errors" hide-details="auto" dense />
            </validation-provider>
          </v-col>
          <v-col cols="12" md="12">
            <validation-provider v-slot="{ errors }" name="message" rules="required">
              <v-textarea v-model="form.message" outlined name="message" label="Sua sua mensagem" :error-messages="errors" hide-details="auto" dense rows="3" auto-grow class="mb-3" />
            </validation-provider>
          </v-col>
        </v-row>
        <div class="text-right">
          <v-btn type="submit" color="secondary" :disabled="invalid" large>
            Enviar mensagem
          </v-btn>
        </div>
      </v-form>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import mixinForm from '@/mixins/form'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  data () {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    async save () {
      const contact = await this.$axios.$post('/api/contacts/contact', this.form)
      if (contact) {
        this.form.name = ''
        this.form.email = ''
        this.form.message = ''
        this.$notifier.success('Sua mensagem foi enviado. Em breve entraremos em contato. Obrigado!')
      }
    }
  }
}
</script>
