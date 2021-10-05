<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <Upload v-model="form.picture" type="images" label="Foto do perfil" avatar />
      <v-row>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="nome" rules="required">
            <v-text-field v-model="form.name" outlined name="name" label="Nome *" :error-messages="errors" />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.organization" outlined label="Organização" />
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="CPF/CNPJ" rules="required">
            <v-text-field v-model="form.cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" outlined name="cpf_cnpj" label="CPF/CNPJ *" :error-messages="errors" />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="telefone" rules="required">
            <v-text-field v-model="form.phone" v-validate="'required'" v-mask="['(##) ####-####', '(##) #####-####']" outlined name="phone" placeholder="(99) 99999-9999" label="Telefone *" :error-messages="errors" />
          </validation-provider>
        </v-col>
        <v-col v-if="$auth.user.role === 'admin'" cols="12" md="6">
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select v-model="form.role" :items="roles" label="Perfil *" :error-messages="errors" outlined />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="email" rules="required|email">
            <v-text-field v-model="form.email" outlined name="email" label="Email *" :error-messages="errors" />
          </validation-provider>
          <v-btn v-if="user" color="light" small class="float-right mt-1" @click="changePassword">
            Alterar senha
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="offer">
            <v-text-field v-model="form.offer" outlined name="offer" label="Eu Ofereço*" :error-messages="errors" />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="need">
            <v-text-field v-model="form.need" outlined name="need" label="Eu Necessito*" :error-messages="errors" />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row v-if="show_password">
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
            <v-text-field v-model="form.password" outlined type="password" name="pass" label="Senha *" :error-messages="errors" />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
            <v-text-field v-model="form.password_confirmation" outlined type="password" name="pass_confirmation" label="Confirmar senha *" :error-messages="errors" />
            <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
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
import roles from '@/data/roles.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      show_password: !this.user,
      roles,
      offers,
      needs,
      form: {
        name: '',
        picture: null,
        email: '',
        organization: '',
        phone: '',
        cpf_cnpj: '',
        password: '',
        password_confirmation: '',
        role: null,
        offer: null,
        need: null
      }
    }
  },
  computed: {
    passwordConfirmed () {
      return !this.show_password || this.form.password === this.form.password_confirmation
    }
  },
  created () {
    this.toForm(this.form, this.user)
  },
  methods: {
    async save () {
      if (this.user) {
        if (this.$auth.user.role === 'admin' && this.user._id !== this.$auth.user._id) {
          const user = await this.$axios.$put('/api/users/' + this.user._id, this.form)
          if (user) {
            this.$notifier.success('Usuário atualizado com sucesso!')
            this.$router.push('/admin/users')
          }
        } else {
          const user = await this.$axios.$put('/api/users', this.form)
          if (user) {
            this.$auth.setUser(user)
            this.$notifier.success('Seus dados foram atualizados com sucesso')
            this.$router.push('/')
          }
        }
      } else {
        const user = await this.$axios.$post('/api/users', this.form)
        if (user) {
          this.$notifier.success('Usuário cadastrado com sucesso!')
          this.$router.push('/admin/users')
        }
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
