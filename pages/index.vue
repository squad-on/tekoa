<template>
  <div>
    <Breadcrumb />
    <div v-if="settings" class="home-page">
      <Banners :items="settings.banners" />
      <section class="content bg-light pb-5">
        <div v-if="settings.description" class="text-center px-5">
          <!-- <img src="~/assets/img/logo-laranja.svg" alt="Sobre"> -->
          <div class="title mt-3">
            <h4>Sobre</h4>
            <hr>
          </div>
          <h5 class="text-center text-primary">{{ settings.description }}</h5>
          <v-btn to="/sobre" color="secondary" class="mt-3 btn-home">
            Saiba mais
          </v-btn>
        </div>
        <v-row>
          <v-col cols="12" md="4">
            <v-card color="#282A38">
              <v-img :src="require('~/assets/img/trilhas.jpg')" alt="Seja um Senior!" />
              <v-card-text>
                <h5>Seja um Senior!</h5>
                <div class="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <n-link to="/conta" class="stretched-link hidden" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="#282A38">
              <v-img :src="require('~/assets/img/trilhas.jpg')" alt="Trilhe sua evolução" />
              <v-card-text>
                <h5>Trilhe sua evolução</h5>
                <div class="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <n-link to="/biblioteca" class="stretched-link hidden" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="#282A38">
              <v-img :src="require('~/assets/img/trilhas.jpg')" alt="Desafie-se!" />
              <v-card-text>
                <h5>Desafie-se!</h5>
                <div class="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <n-link to="/noticias" class="stretched-link hidden" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    settings () {
      return this.$store.state.settings
    }
  }
}
</script>
