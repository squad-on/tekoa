<template>
  <div class="mb-6">
    <v-list color="tertiary">
      <v-list-item v-for="user in matches" :key="user._id" :href="user.url" target="_blank" class="mr-1 mb-1">
        <v-list-item-avatar>
          <v-img v-if="user && user.picture && user.picture.url" :src="user.picture.url" />
          <v-icon v-else>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="mb-2">{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>
            <div class="mb-2">
              Oferece: <v-chip v-for="offer in user.offer" :key="'offer-' + offer" :color="$auth.user.need.includes(offer) ? 'primary' : 'default'" small class="mr-1">{{ offer }}</v-chip>
            </div>
            <div>
              Precisa: <v-chip v-for="need in user.need" :key="'need-' + need" small class="mr-1" :color="$auth.user.offer.includes(need) ? 'primary' : 'default'">{{ need }}</v-chip>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                icon
                v-on="on"
              >
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  Conecte-se com <strong> &nbsp;{{ user.name }}</strong>
                </v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-12">Hello world!</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="dialog.value = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    matches: {
      type: Array,
      default: () => []
    }
  },
  methods: {

  }
}
</script>
