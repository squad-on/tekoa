<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
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
          <b-form-group label="Organização">
            <b-form-input v-model="form.organization" />
          </b-form-group>
        </v-col>
        <v-col cols="12" md="6">
          <b-form-group label="CPF/CNPJ *">
            <validation-provider v-slot="{ errors }" name="CPF/CNPJ" rules="required">
              <b-form-input v-model="form.cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" name="cpf_cnpj" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </v-col>
        <v-col cols="12" md="6">
          <b-form-group label="Telefone *">
            <validation-provider v-slot="{ errors }" name="telefone" rules="required">
              <b-form-input v-model="form.phone" v-validate="'required'" v-mask="['(##) ####-####', '(##) #####-####']" name="phone" placeholder="(99) 99999-9999" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </v-col>
        <v-col cols="12" md="12">
          <b-form-group label="Endereços *">
            <AddressesForm v-model="form.addresses" />
          </b-form-group>
        </v-col>
        <v-col v-if="$auth.user.role === 'admin'" cols="12" md="6">
          <b-form-group label="Perfil *">
            <validation-provider v-slot="{ errors }" rules="required">
              <b-form-select v-model="form.role" :options="roles" />
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
            <v-btn v-if="user" color="light" size="sm" class="float-right mt-1" @click="changePassword">
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
            <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
              <b-form-input v-model="form.password_confirmation" type="password" name="pass_confirmation" />
              <span class="text-danger">{{ errors[0] }}</span>
              <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
            </validation-provider>
          </b-form-group>
        </v-col>
      </v-row>
      <br>
      <v-btn type="submit" color="success" block :disabled="invalid">
        Salvar
      </v-btn>
    </b-form>
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
      form: {
        name: '',
        picture: null,
        email: '',
        organization: '',
        phone: '',
        cpf_cnpj: '',
        addresses: [],
        password: '',
        password_confirmation: '',
        role: null
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
            this.$toast.success('Usuário atualizado com sucesso!')
            this.$router.push('/conta/users')
          }
        } else {
          const user = await this.$axios.$put('/api/users', this.form)
          if (user) {
            this.$auth.setUser(user)
            this.$toast.success('Seus dados foram atualizados com sucesso')
            this.$router.push('/conta')
          }
        }
      } else {
        const user = await this.$axios.$post('/api/users', this.form)
        if (user) {
          this.$toast.success('Usuário cadastrado com sucesso!')
          this.$router.push('/conta/users')
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
