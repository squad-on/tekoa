export default async function (ctx, inject) {
  const icons = {"64x64":"/_nuxt/icons/icon_64.24385a.png","120x120":"/_nuxt/icons/icon_120.24385a.png","144x144":"/_nuxt/icons/icon_144.24385a.png","152x152":"/_nuxt/icons/icon_152.24385a.png","192x192":"/_nuxt/icons/icon_192.24385a.png","384x384":"/_nuxt/icons/icon_384.24385a.png","512x512":"/_nuxt/icons/icon_512.24385a.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
