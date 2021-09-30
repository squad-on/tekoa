<template>
  <div class="">
    <Breadcrumb
      :active="tab === 'login' ? 'Entrar' : 'Cadastre-se'"
    />
    <section class="content pb-5">
      <v-container fluid>
        <div v-show="tab === 'login'">
          <form @submit.prevent="login">
            <v-text-field v-model="form.email" type="text" label="Digite seu email" />
            <v-text-field v-model="form.password" type="password" label="Digite sua senha" />
            <div class="text-center">
              <v-btn type="submit" color="success" block size="lg">
                Entrar
              </v-btn>
              <p class="mt-4">
                Ainda não possúi uma conta?
                <v-btn color="primary" size="sm" @click="open('register')">
                  <strong>Cadastre-se</strong>
                </v-btn>
              </p>
            </div>
          </form>
        </div>
        <div v-show="tab === 'register'">
          <ValidationObserver v-slot="{ validate, invalid }">
            <form @submit.prevent="validate().then(register)">
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="nome" rules="required">
                    <v-text-field v-model="register_form.name" name="name" label="Seu nome completo *" :error-messages="errors" />
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="register_form.organization" label="Você faz parte de alguma organização?" />
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="CPF/CNPJ" rules="required">
                    <v-text-field v-model="register_form.cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" name="cpf_cnpj" label="CPF/CNPJ *" :error-messages="errors" />
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="telefone" rules="required">
                    <v-text-field v-model="register_form.phone" v-validate="'required'" v-mask="['(##) ####-####', '(##) #####-####']" name="phone" placeholder="(99) 99999-9999" label="Telefone *" :error-messages="errors" />
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="12">
                  <AddressForm v-model="register_form.address" label="Seu endereço" />
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field v-model="register_form.email" name="email" label="Seu email" :error-messages="errors" />
                  </validation-provider>
                </v-col>
                </v-col>
                </v-col>
                </v-col>
                </v-col>
                </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
                    <v-text-field v-model="register_form.password" type="password" name="pass" label="Sua senha" :error-messages="errors" />
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
                    <v-text-field v-model="register_form.password_confirmation" type="password" name="pass_confirmation" label="Confirme a sua senha" :error-messages="errors" />
                    <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
                  </validation-provider>
                </v-col>
                </v-col>
                </v-col>
              </v-row>
              <div class="text-center">
                <v-btn type="submit" color="success" block size="lg" :disabled="invalid">
                  Cadastrar
                </v-btn>
                <p class="mt-4">
                  Já possúi uma conta?
                  <v-btn color="primary" size="sm" @click="open('login')">
                    <strong>Entre</strong>
                  </v-btn>
                </p>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
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
        address: {
          city: '',
          uf: '',
          location: {
            type: 'Point',
            coordinates: []
          }
        },
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
