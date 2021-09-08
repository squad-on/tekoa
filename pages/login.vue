<template>
  <div class="">
    <Breadcrumb
      :active="tab === 'login' ? 'Entrar' : 'Cadastre-se'"
    />
    <section class="content pb-5">
      <b-container fluid="md">
        <div v-show="tab === 'login'">
          <form @submit.prevent="login">
            <b-form-group label="Digite seu email">
              <b-form-input v-model="form.email" type="text" />
            </b-form-group>
            <b-form-group label="Digite sua senha">
              <b-form-input v-model="form.password" type="password" />
            </b-form-group>
            <div class="text-center">
              <b-button type="submit" variant="success" block size="lg">
                Entrar
              </b-button>
              <p class="mt-4">
                Ainda não possúi uma conta?
                <b-btn variant="primary" size="sm" @click="open('register')">
                  <strong>Cadastre-se</strong>
                </b-btn>
              </p>
            </div>
          </form>
        </div>
        <div v-show="tab === 'register'">
          <ValidationObserver v-slot="{ validate, invalid }">
            <form @submit.prevent="validate().then(register)">
              <b-row>
                <b-col md="6">
                  <b-form-group label="Seu nome completo *">
                    <validation-provider v-slot="{ errors }" name="nome" rules="required">
                      <b-form-input v-model="register_form.name" name="name" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Você faz parte de alguma organização?">
                    <b-form-input v-model="register_form.organization" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="CPF/CNPJ *">
                    <validation-provider v-slot="{ errors }" name="CPF/CNPJ" rules="required">
                      <b-form-input v-model="register_form.cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" name="cpf_cnpj" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Telefone *">
                    <validation-provider v-slot="{ errors }" name="telefone" rules="required">
                      <b-form-input v-model="register_form.phone" v-validate="'required'" v-mask="['(##) ####-####', '(##) #####-####']" name="phone" placeholder="(99) 99999-9999" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Seu endereço">
                    <AddressForm v-model="register_form.address" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Seu email">
                    <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                      <b-form-input v-model="register_form.email" name="email" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Sua senha">
                    <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
                      <b-form-input v-model="register_form.password" type="password" name="pass" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Confirme a sua senha">
                    <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
                      <b-form-input v-model="register_form.password_confirmation" type="password" name="pass_confirmation" />
                      <span class="text-danger">{{ errors[0] }}</span>
                      <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="text-center">
                <b-button type="submit" variant="success" block size="lg" :disabled="invalid">
                  Cadastrar
                </b-button>
                <p class="mt-4">
                  Já possúi uma conta?
                  <b-btn variant="primary" size="sm" @click="open('login')">
                    <strong>Entre</strong>
                  </b-btn>
                </p>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </b-container>
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
