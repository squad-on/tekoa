<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <v-row>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="ofereço" rules="required">
            <h3 class="mb-3"><strong class="primary--text">Ofereço</strong> ajuda/mentoria em: </h3>
            <v-select
              v-model="form.offer"
              hide-details="auto" :items="categories"
              chips
              multiple
              outlined
              :error-messages="errors"
            />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="preciso" rules="required">
            <h3 class="mb-3"><strong class="primary--text">Preciso</strong> de ajuda/mentoria em: </h3>
            <v-select
              v-model="form.need"
              hide-details="auto" :items="categories"
              chips
              multiple
              outlined
              :error-messages="errors"
            />
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
import categories from '@/data/match-categories.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  data () {
    return {
      categories,
      user: null,
      form: {
        offer: null,
        need: null
      }
    }
  },
  async created () {
    this.user = await this.$axios.$get('/api/profile')
    this.toForm(this.form, this.user)
  },
  methods: {
    async save () {
      if (this.user) {
        const user = await this.$axios.$put('/api/users/match', this.form)
        if (user) {
          this.$auth.setUser(user)
          this.$notifier.success('Seu perfil foi atualizado!')
          this.$emit('input', user)
        }
      }
    }
  }
}
</script>
