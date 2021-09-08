import Vue from 'vue'
import VeeValidate from 'vee-validate'

import pt_BR from 'vee-validate/dist/locale/pt_BR'

Vue.use(VeeValidate, {})

VeeValidate.Validator.localize('pt_BR', pt_BR)

export default ({ app }, inject) => {
  app.validator = VeeValidate.Validator
}
