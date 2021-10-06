<template>
  <div>
    <Breadcrumb />
    <div v-if="settings" class="home-page">
      <Banners :items="settings.banners" />
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
        <v-col cols="12" md="3">
          <v-card color="#282A38" to="/login?tab=register">
            <v-img :src="require('~/assets/img/senior.jpg')" alt="Seja um Senior!" :aspect-ratio="16/9" />
            <v-card-title>Seja um Senior!</v-card-title>
            <v-card-text>
              <div class="text-primary">A Prolancer.Guru vai mudar a forma como você desenvolve sua carreira!</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="#282A38" to="/trilhas">
            <v-img :src="require('~/assets/img/trilhas_c.jpg')" alt="Trilhe sua evolução" :aspect-ratio="16/9" />
            <v-card-title>Trilhe sua evolução</v-card-title>
            <v-card-text>
              <div class="text-primary">Os melhores conteúdos gratuitos da web spara Seniores catalogados!</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="#282A38" to="/desafios">
            <v-img :src="require('~/assets/img/trilhas_b.jpg')" alt="Desafie-se!" :aspect-ratio="16/9" />
            <v-card-title>Desafie-se!</v-card-title>
            <v-card-text>
              <div class="text-primary">Encontre um prolancer para guiar ou para ser seu guia nesta jornada!</div>
            </v-card-text>
          </v-card>
          <v-col cols="12" md="3">
            <v-card color="#282A38" to="/desafios">
              <v-img :src="require('~/assets/img/trilhas_c.jpg')" alt="Desafie-se!" :aspect-ratio="16/9" />
              <v-card-title>Jornada!</v-card-title>
              <v-card-text>
                <div class="text-primary">Conheça nossa Jornada! Nossa origem é uma luta interna pela Senioridade!</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-col>
      </v-row>
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
