<template>
  <v-container fluid>
    <div v-show="tab === 'login'">
      <div class="text-center">
        <p class="mb-8">
          Ainda não possúi uma conta?
          <v-btn color="success" small @click="open('register')">
            <strong>Cadastre-se</strong>
          </v-btn>
        </p>
      </div>
      <form @submit.prevent="login">
        <v-text-field v-model="form.email" outlined type="text" label="Digite seu email" append-icon="mdi-email-outline" />
        <v-text-field v-model="form.password" outlined type="password" label="Digite sua senha" append-icon="mdi-lock" />
        <v-btn type="submit" color="primary" block x-large>
          Entrar
        </v-btn>
      </form>
    </div>
    <div v-show="tab === 'register'">
      <p class="mb-8 text-center">
        Já possúi uma conta?
        <v-btn color="success" small @click="open('login')">
          <strong>Entre</strong>
        </v-btn>
      </p>
      <ValidationObserver v-slot="{ validate, invalid }">
        <v-form @submit.prevent="validate().then(register)">
          <validation-provider v-slot="{ errors }" name="nome" rules="required">
            <v-text-field v-model="register_form.name" outlined name="name" label="Seu nome completo *" :error-messages="errors" />
          </validation-provider>

          <!-- <v-text-field v-model="register_form.organization" outlined label="Você faz parte de alguma organização?" /> -->

          <validation-provider v-slot="{ errors }" name="CPF/CNPJ" rules="required">
            <v-text-field v-model="register_form.cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" outlined name="cpf_cnpj" label="CPF/CNPJ *" :error-messages="errors" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="telefone" rules="required">
            <v-text-field v-model="register_form.phone" v-validate="'required'" v-mask="['(##) ####-####', '(##) #####-####']" outlined name="phone" placeholder="(99) 99999-9999" label="Telefone *" :error-messages="errors" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="email" rules="required|email">
            <v-text-field v-model="register_form.email" outlined name="email" label="Seu email" :error-messages="errors" append-icon="mdi-email-outline" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
            <v-text-field v-model="register_form.password" outlined type="password" name="pass" label="Sua senha" :error-messages="errors" append-icon="mdi-lock" />
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
            <v-text-field v-model="register_form.password_confirmation" outlined type="password" name="pass_confirmation" label="Confirme a sua senha" :error-messages="errors" append-icon="mdi-lock-alert-outline" />
            <v-alert v-if="!passwordConfirmed" type="error" class="text-danger">As senhas digitadas não conferem</v-alert>
          </validation-provider>

          <v-btn type="submit" color="primary" block x-large :disabled="invalid">
            Cadastrar
          </v-btn>
        </v-form>
      </ValidationObserver>
    </div>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {

  components: {
    ValidationObserver,
    ValidationProvider
  },
  layout: 'login',
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
