<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <validation-provider v-slot="{ errors }" name="título do site" rules="required">
        <v-text-field v-model="form.title" outlined name="title" label="Título do site" :error-messages="errors" />
      </validation-provider>
      <v-row>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="nome do administrador" rules="required">
            <v-text-field v-model="form.admin_name" outlined label="Nome do administrador" :error-messages="errors" />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="email do administrador" rules="required">
            <v-text-field v-model="form.email" outlined name="email" label="Email do administrador" :error-messages="errors" />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
            <v-text-field v-model="form.password" outlined type="password" name="pass" label="Senha do administrador" :error-messages="errors" />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
            <v-text-field v-model="form.password_confirmation" outlined type="password" name="pass_confirmation" label="Confirmar senha" :error-messages="errors" />
            <span v-if="form.password_confirmation && form.password_confirmation !== form.password" class="text-danger">As senhas digitadas não conferem</span>
          </validation-provider>
        </v-col>
      </v-row>
      <Save :invalid="invalid" />
    </v-form>
  </ValidationObserver>
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
  props: {
    settings: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        title: '',
        admin_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  created () {
    this.toForm(this.form, this.settings)
  },
  methods: {
    async save () {
      const settings = await this.$axios.$post('/api/settings/setup', this.form)
      if (settings) {
        await this.$auth.loginWith('local', { data: this.form })
        this.$notifier.success('Configurações cadastradas com sucesso!')
        this.$router.push('/admin/settings')
      }
    }
  }
}
</script>
