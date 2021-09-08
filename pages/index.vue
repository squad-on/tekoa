<template>
  <div>
    <div v-if="settings" class="home-page">
      <Banners :items="settings.banners" />
      <section class="content bg-light pb-5">
        <b-container fluid="lg">
          <div v-if="settings.description" class="text-center px-5">
            <!-- <img src="~/assets/img/logo-laranja.svg" alt="Sobre"> -->
            <div class="title mt-3">
              <h4>Sobre</h4>
              <hr>
            </div>
            <h5 class="text-center text-primary">{{ settings.description }}</h5>
            <b-button to="/sobre" variant="secondary" class="mt-3 btn-home">
              Saiba mais
            </b-button>
          </div>
          <b-row class="mt-5">
            <b-col md="6" class="mb-3">
              <b-card img-src="~/assets/img/trilhas.jpg" img-alt="Notícias" img-left class="bg-white">
                <b-card-text>
                  <h5>Seja um Senior!</h5>
                  <div class="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                  <n-link to="/conta" class="stretched-link hidden" />
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card to img-src="~/assets/img/trilhas.jpg" img-alt="Acervo" img-left class="bg-white">
                <b-card-text>
                  <h5>Trilhe sua evolução</h5>
                  <div class="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                  <n-link to="/biblioteca" class="stretched-link hidden" />
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col md="6" class="mb-3">
              <b-card img-src="~/assets/img/trilhas.jpg" img-alt="Notícias" img-left class="bg-white">
                <b-card-text>
                  <h5>Desafie-se!</h5>
                  <div class="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                  <n-link to="/noticias" class="stretched-link hidden" />
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card to img-src="~/assets/img/trilhas.jpg" img-alt="Acervo" img-left class="bg-white">
                <b-card-text>
                  <h5>Seja reconhecido!</h5>
                  <div class="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                  <n-link to="/agenda" class="stretched-link hidden" />
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
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
