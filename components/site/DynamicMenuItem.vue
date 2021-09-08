<template>
  <b-navbar-nav v-if="menuFormated !== null" class="ml-auto">
    <template v-for="menu in menuFormated">
      <b-nav-item v-if="!menu.submenus || menu.submenus.length === 0" :key="menu._id" :to="menu.internalUrl" :href="menu.externalUrl" :target="menu.internalUrl ? '_self' : '_blank'">
        {{ menu.name }}
      </b-nav-item>
      <b-nav-item-dropdown v-if="menu.submenus && menu.submenus.length > 0" :key="`submenu-${menu._id}`" :text="menu.name">
        <b-dropdown-item v-for="submenu in menu.submenus" :key="submenu._id" :to="submenu.internalUrl" :href="submenu.externalUrl" :target="submenu.internalUrl ? '_self' : '_blank'">{{ submenu.name }}</b-dropdown-item>
      </b-nav-item-dropdown>
    </template>
    <b-nav-item to="/biblioteca">Trilhas</b-nav-item>
    <b-nav-item to="/noticias">Desafios</b-nav-item>
    <b-nav-item to="/agenda">Avaliação</b-nav-item>
    <b-nav-item :to="'/conta'" variant="primary" size="lg" title="Minha conta">
      <b-icon-person /> <span class="d-lg-none">Minha conta</span>
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
export default {
  name: 'DynamicMenuItem',
  props: {
    menus: {
      type: Array,
      default: null,
      required: true
    }
  },
  computed: {
    menuFormated () {
      return this.menus.map(m => {
        const menu = { ...m }
        this.setUrl(menu)
        for (let submenuIndex = 0; submenuIndex < menu.submenus.length; submenuIndex++) {
          const submenu = menu.submenus[submenuIndex]
          this.setUrl(submenu)
        }
        return menu
      })
    }
  },
  methods: {
    setUrlMenuAndSubmenu() {

    },
    setUrl(menu) {
      // cria a URL do item de menu, que pode ser: interna (link para dentro do site) ou externa (link para uma página fora do site)
      // 1. interno = menu associado a uma página interna do site
      // 2. interno = menu com o campo URL preenchido começando com "/"
      // 3. externo = menu com o campo URL preenchido, caso não comece com HTTP ou HTTPS esse trecho é incluído
      // 4. menu sem link = demais cenários

      if (menu.page && menu.page.slug) {
        menu.internalUrl = '/' + menu.page.slug
      } else if (menu.url) {
        menu.internalUrl = menu.url.startsWith('/') ? menu.url : ''
        menu.externalUrl = !menu.internalUrl ? menu.url : ''
        if (menu.externalUrl) {
          menu.externalUrl = (menu.url.startsWith('https://') || menu.url.startsWith('http://') ? '' : 'https://') + menu.url
        }
      } else {
        menu.internalUrl = ''
        menu.externalUrl = ''
      }
    }
  }
}
</script>
