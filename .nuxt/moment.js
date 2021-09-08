import moment from 'moment'

import 'moment/locale/pt-br'

import 'moment-timezone'

moment.locale('pt-br')

moment.tz.setDefault('utc')

export default (ctx, inject) => {
  ctx.$moment = moment
  inject('moment', moment)
}
