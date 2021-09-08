<template>
  <div v-if="validCoordinates">
    <div class="text-dark">
      <small v-if="address && address.description"><strong>{{ address.description }}</strong></small>
      <small><br>Coordenadas: {{ address.location.coordinates.join(',') }} <a size="sm" variant="light" @click="show_map = !show_map"><strong>({{ show_map ? 'Esconder mapa' : 'Ver mapa' }})</strong></a></small>
    </div>
    <l-map v-if="show_map" :zoom="16" :center="address.location.coordinates" :options="{ scrollWheelZoom: false }" style="height: 30vw;" class="mb-4">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="address.location.coordinates" />
    </l-map>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      show_map: false
    }
  },
  computed: {
    validCoordinates () {
      if (this.address && this.address.location && this.address.location.coordinates && this.address.location.coordinates.length > 1) {
        if (this.address.location.coordinates[0] > -90 && this.address.location.coordinates[0] < 90) {
          if (this.address.location.coordinates[1] > -180 && this.address.location.coordinates[1] < 180) {
            return true
          }
        }
      }
      return false
    }
  }
}
</script>
