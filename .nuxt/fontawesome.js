import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeLayers,
  FontAwesomeLayersText,
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import {
  faBars as freeFasFaBars
} from '@fortawesome/free-solid-svg-icons'

import {
  faFacebookSquare as freeFabFaFacebookSquare,
  faTwitterSquare as freeFabFaTwitterSquare,
  faInstagramSquare as freeFabFaInstagramSquare,
  faYoutubeSquare as freeFabFaYoutubeSquare
} from '@fortawesome/free-brands-svg-icons'

library.add(
  freeFasFaBars,
  freeFabFaFacebookSquare,
  freeFabFaTwitterSquare,
  freeFabFaInstagramSquare,
  freeFabFaYoutubeSquare
)

config.autoAddCss = false

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('FontAwesomeLayers', FontAwesomeLayers)
Vue.component('FontAwesomeLayersText', FontAwesomeLayersText)
