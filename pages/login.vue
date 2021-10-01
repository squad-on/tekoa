<template>
  <v-container fluid>
    <div v-show="tab === 'login'">
      <form @submit.prevent="login">
        <v-text-field v-model="form.email" outlined type="text" label="Digite seu email" />
        <v-text-field v-model="form.password" outlined type="password" label="Digite sua senha" />
        <div class="text-center">
          <v-btn type="submit" color="success" block large>
            Entrar
          </v-btn>
          <p class="mt-4">
            Ainda não possúi uma conta?
            <v-btn color="primary" small @click="open('register')">
              <strong>Cadastre-se</strong>
            </v-btn>
          </p>
        </div>
      </form>
    </div>
    <div v-show="tab === 'register'">
      <ValidationObserver v-slot="{ validate, invalid }">
        <v-form @submit.prevent="validate().then(register)">
          <validation-provider v-slot="{ errors }" name="nome" rules="required">
            <v-text-field v-model="register_form.name" outlined name="name" label="Seu nome completo *" :error-messages="errors" />
          </validation-provider>

          <v-text-field v-model="register_form.organization" outlined label="Você faz parte de alguma organização?" />

          <validation-provider v-slot="{ errors }" name="CPF/CNPJ" rules="required">
            <v-text-field v-model="register_form.cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" outlined name="cpf_cnpj" label="CPF/CNPJ *" :error-messages="errors" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="telefone" rules="required">
            <v-text-field v-model="register_form.phone" v-validate="'required'" v-mask="['(##) ####-####', '(##) #####-####']" outlined name="phone" placeholder="(99) 99999-9999" label="Telefone *" :error-messages="errors" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="email" rules="required|email">
            <v-text-field v-model="register_form.email" outlined name="email" label="Seu email" :error-messages="errors" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
            <v-text-field v-model="register_form.password" outlined type="password" name="pass" label="Sua senha" :error-messages="errors" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
            <v-text-field v-model="register_form.password_confirmation" outlined type="password" name="pass_confirmation" label="Confirme a sua senha" :error-messages="errors" />
            <v-alert v-if="!passwordConfirmed" type="error" class="text-danger">As senhas digitadas não conferem</v-alert>
          </validation-provider>

          <div class="text-center">
            <v-btn type="submit" color="success" block large :disabled="invalid">
              Cadastrar
            </v-btn>
            <p class="mt-4">
              Já possúi uma conta?
              <v-btn color="primary" small @click="open('login')">
                <strong>Entre</strong>
              </v-btn>
            </p>
          </div>
        </v-form>
      </ValidationObserver>
    </div>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  layout: 'login',

  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      tab: this.$route.query.tab || 'login',
      form: {
        email: '',
        password: ''
      },
      register_form: {
        name: '',
        email: '',
        organization: '',
        phone: '',
        cpf_cnpj: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    passwordConfirmed () {
      return this.register_form.password === this.register_form.password_confirmation
    }
  },
  methods: {
    async login () {
      await this.$auth.loginWith('local', { data: this.form }).catch(e => {})
    },
    async register () {
      const user = await this.$axios.$post('/api/users/register', this.register_form)
      if (user && user._id) {
        await this.$auth.loginWith('local', { data: this.register_form })
      }
    },
    open (tab) {
      this.tab = tab
    }
  },
  head() {
    return {
      title: (this.tab === 'login' ? 'Entrar' : 'Cadastrar')
    }
  }
}
</script>
