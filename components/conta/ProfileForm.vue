<template>
  <ValidationObserver v-slot="{ invalid }" tag="form" @submit.prevent="save">
    <Upload v-model="form.picture" type="images" label="Foto do perfil" avatar />
    <v-row>
      <v-col cols="12" md="6">
        <b-form-group label="Nome *">
          <validation-provider v-slot="{ errors }" name="nome" rules="required">
            <b-form-input v-model="form.name" name="name" />
            <span class="text-danger">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
      </v-col>
      <v-col cols="12" md="6">
        <b-form-group label="Email *">
          <validation-provider v-slot="{ errors }" name="email" rules="required|email">
            <b-form-input v-model="form.email" name="email" />
            <span class="text-danger">{{ errors[0] }}</span>
          </validation-provider>
          <v-btn size="sm" color="light" class="float-right mt-1" @click="changePassword">
            Alterar senha
          </v-btn>
        </b-form-group>
      </v-col>
    </v-row>
    <v-row v-if="show_password">
      <v-col cols="12" md="6">
        <b-form-group label="Senha *">
          <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
            <b-form-input v-model="form.password" type="password" name="pass" />
            <span class="text-danger">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
      </v-col>
      <v-col cols="12" md="6">
        <b-form-group label="Confirmar senha *">
          <validation-provider v-slot="{ errors }" rules="password_confirmation:password">
            <b-form-input v-model="form.password_confirmation" type="password" name="pass_confirmation" />
            <span class="text-danger">{{ errors[0] }}</span>
            <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
          </validation-provider>
        </b-form-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <b-form-group label="Seu endereço">
          <AddressForm v-model="form.address" />
        </b-form-group>
      </v-col>
      <v-col cols="12" md="12">
        <b-form-group label="Organização *">
          <validation-provider v-slot="{ errors }" name="organização" rules="required">
            <b-form-input v-model="form.organization" />
            <span class="text-danger">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
      </v-col>
    </v-row>
    <v-btn type="submit" color="success" block :disabled="invalid || !passwordConfirmed">
      Salvar
    </v-btn>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import mixinForm from '@/mixins/form'
export default {
  layout: 'conta',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  data () {
    return {
      show_password: false,
      form: {
        name: '',
        picture: null,
        email: '',
        password: '',
        password_confirmation: '',
        organization: '',
        address: {
          city: '',
          uf: '',
          location: {
            type: 'Point',
            coordinates: []
          }
        }
      }
    }
  },
  computed: {
    passwordConfirmed () {
      return !this.show_password || this.form.password === this.form.password_confirmation
    }
  },
  async created () {
    const profile = await this.$axios.$get('/api/profile')
    if (profile) {
      this.toForm(this.form, profile)
    }
  },
  methods: {
    async save () {
      const profile = await this.$axios.$put('/api/users', this.form)
      if (profile) {
        this.$auth.setUser(profile)
        this.$toast.success('Seus dados foram atualizados com sucesso')
        this.$router.push('/conta')
      }
    },
    changePassword () {
      this.show_password = !this.show_password
      if (!this.show_password) {
        this.form.password = ''
        this.form.password_confirmation = ''
      }
    }
  }
}
</script>
