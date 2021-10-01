<template>
  <div class="address-form">
    <AddressPreview :address="value" />
    <v-btn v-if="currentAddressFilled" color="light" @click="show_modal = !show_modal"><client-only><b-icon-pencil /></client-only> Mudar endereço</v-btn>
    <v-btn v-else color="success" @click="show_modal = !show_modal"><client-only><b-icon-plus /></client-only> Adicionar endereço</v-btn>
    <b-modal v-model="show_modal" title="Localização" hide-footer hide-header size="lg">
      <div v-if="show_auto_complete">
        <div v-if="!addressFilled">
          <p><strong>Digite seu endereço para buscar a localização:</strong></p>
          <v-text-field outlined v-model="address_input" class="input-lg" @keyup.enter="searchByAddress" />
          <small>Ex: rua das nascentes, alto paraíso, goiás</small>
          <p class="text-center mt-3">
            <v-btn color="primary" @click="getLocation()">Buscar pelo GPS</v-btn>
            <v-btn v-if="address_input" color="primary" @click="searchByAddress"><b-icon-search /> Buscar pelo endereço</v-btn>
          </p>
          <p v-if="loading_gps" class="text-center">
            <v-progress-circular indeterminate small /> Buscando dados do GPS...
          </p>
        </div>
        <div v-else class="text-center">
          <div v-if="Array.isArray(address)" class="text-center">
            <p><strong>Algum desses é seu endereço?</strong></p>
            <table class="table md-auto">
              <tr v-for="(a, index) in address" :key="index" class="table">
                <td class="text-left">
                  {{ a.description }}
                </td>
                <td class="text-right">
                  <v-btn color="success" size="sm" @click="setAddressForm(a)">Selecionar</v-btn>
                </td>
              </tr>
            </table>
            <v-btn color="light" @click="showAutoComplete()">Nenhum desses é meu endereço</v-btn>
          </div>
          <div v-else>
            <p>
              Este é seu endereço?
              <br>
              <strong>{{ address.description }}</strong>
              <br>
              <small>Você pode arrastar o ponto no mapa para ajustar sua localização</small>
            </p>
            <div v-if="address && address.location && address.location.coordinates && address.location.coordinates.length === 2">
              <l-map :zoom="16" :center="address.location.coordinates" :options="{ scrollWheelZoom: false }" style="height: 250px;">
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-marker :lat-lng="address.location.coordinates" draggable @dragend="updateMarker">
                  <l-tooltip>Clique e arraste para refinar sua localização.</l-tooltip>
                </l-marker>
              </l-map>
              <p>
                <small>Coordenadas: {{ address.location.coordinates.join(',') }}</small>
              </p>
            </div>
            <v-btn color="light" size="lg" @click="showAutoComplete()">Não</v-btn>
            <v-btn color="success" size="lg" @click="setAddressForm(address)">Sim</v-btn>
          </div>
        </div>
      </div>
      <div v-else>
        <ValidationObserver v-slot="{ validate, invalid }">
          <v-form @submit.prevent="validate().then(confirmAddress)">
            <div class="form-address">
              <p class="mb-4"><strong>Complete os dados e confirme o endereço:</strong></p>
              <v-row>
                <v-col cols="12" sm="3">
                  <v-form-group label="CEP *">
                    <validation-provider v-slot="{ errors }" name="CEP" rules="required|min:9|max:9">
                      <v-text-field outlined v-model="form.postal_code" v-mask="'#####-###'" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </v-form-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-form-group label="Estado *">
                    <validation-provider v-slot="{ errors }" name="estado" rules="required">
                      <v-text-field outlined v-model="form.uf" class="form-control" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </v-form-group>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-form-group label="Cidade *">
                    <validation-provider v-slot="{ errors }" name="cidade" rules="required">
                      <v-text-field outlined v-model="form.city" class="form-control" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </v-form-group>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-form-group label="Endereço/Rua/Av *">
                    <validation-provider v-slot="{ errors }" name="endereço" rules="required">
                      <v-text-field outlined v-model="form.street" name="street" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </v-form-group>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-form-group label="Bairro">
                    <v-text-field outlined v-model="form.neighborhood" name="neighborhood" />
                  </v-form-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-form-group label="Número">
                    <v-text-field outlined v-model="form.number" name="number" />
                  </v-form-group>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-form-group label="Complemento">
                    <v-text-field outlined v-model="form.complement" name="complement" />
                  </v-form-group>
                </v-col>
              </v-row>
            </div>
            <v-btn color="light" @click="showAutoComplete()">Mudar localização</v-btn>
            <v-btn type="submit" color="success" size="lg" :disabled="invalid">
              Confirmar endereço
            </v-btn>
          </v-form>
        </ValidationObserver>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import estados from '@/data/estados.json'
import AddressPreview from '@/components/conta/AddressPreview'
import cidades from '@/data/cidades.json'

const emptyForm = {
  city: '',
  uf: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  postal_code: '',
  description: '',
  source: '',
  location: {
    type: 'Point',
    coordinates: []
  }
}

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    AddressPreview
  },
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      estados,
      loading_gps: false,
      show_modal: false,
      address: null,
      location: null,
      address_input: '',
      show_auto_complete: true,
      form: emptyForm,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  computed: {
    currentAddressFilled () {
      return this.value && this.value.postal_code && this.value.uf && this.value.city && this.value.street
    },
    addressFilled () {
      return Array.isArray(this.address) || (this.address && this.address.location && this.address.location.coordinates && this.address.location.coordinates.length === 2)
    },
    cidades () {
      if (this.form.uf) {
        return cidades[this.form.uf]
      }
      return null
    }
  },
  created() {
    console.log('created')
    console.log(this.address)
    console.log(this.value)
    this.address = { ...this.value }
    if (this.value) {
      Object.keys(this.form).forEach(k => {
        this.form[k] = this.value[k]
      })
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        this.loading_gps = true
        navigator.geolocation.getCurrentPosition(position => {
          this.searchByLocation(position.coords.latitude, position.coords.longitude)
        }, this.locationError)
      } else {
        this.locationError()
      }
    },
    searchByLocation(latitude, longitude) {
      axios.get('https://us1.locationiq.com/v1/reverse.php?key=81b80182fef784&lat=' + latitude + '&lon=' + longitude + '&accept-language=pt-BR&normalizecity=1&format=json').then(resp => {
        this.address = this.parseAddress(resp.data.address, latitude, longitude)
        this.loading_gps = false
      }).catch(this.locationError)
    },
    searchByAddress() {
      axios.get('https://us1.locationiq.com/v1/search.php?key=81b80182fef784&q=' + encodeURI(this.address_input) + '&addressdetails=1&limit=10&countrycodes=BR&accept-language=pt-BR&normalizecity=1&format=json').then(resp => {
        const data = resp.data
        if (data.length === 1) {
          const address = data[0]
          this.address = this.parseAddress(address.address, address.lat, address.lon)
        } else {
          this.address = data.map(address => {
            return this.parseAddress(address.address, address.lat, address.lon)
          })
        }
      }).catch(e => {
        this.$notifier.error('Não foi possível encontrar seu endereço. Verifique o que foi digitado e tente novamente.')
      })
    },
    updateMarker(location) {
      location = location.target._latlng
      this.searchByLocation(location.lat, location.lng)
    },
    parseAddress(address, latitude, longitude) {
      const a = {}
      a.street = address.road
      a.neighborhood = address.neighbourhood || address.hamlet || address.suburb
      a.city = address.city || address.city_district || address.village || address.town
      a.uf = address.state || address.state_district
      if (a.uf.length !== 2) {
        const estado = estados.find(e => e.text === a.uf)
        if (estado) {
          a.uf = estado.value
        }
      }
      a.postal_code = address.postcode

      a.description = [a.street, a.neighborhood, a.city, a.uf, a.postal_code].filter(i => i).join(', ')

      a.location = {
        type: 'Point',
        coordinates: [Number(latitude), Number(longitude)]
      }

      // a.source = address
      return a
    },
    setAddressForm(address) {
      this.address = address
      Object.keys(this.form).forEach(k => {
        this.form[k] = this.address[k]
      })
      this.show_auto_complete = false
    },
    confirmAddress() {
      this.form.description = [
        this.form.street,
        this.form.number,
        this.form.complement,
        this.form.neighborhood,
        this.form.city,
        this.form.uf,
        this.form.postal_code
      ].filter(i => i).join(', ')

      this.show_modal = false
      this.cb()
    },
    showAutoComplete() {
      this.address = null
      this.form = { ...emptyForm }
      this.show_auto_complete = true
    },
    locationError() {
      this.$notifier.error('Não foi possível encontrar seu endereço automaticamente.')
      this.loading_gps = false
    },
    cb () {
      this.$emit('input', { ...this.form })
    }
  }
}
</script>
