<template>
  <div>
    <Breadcrumb active="Prolancer.match" />
    <h2 class="mb-6 text--secondary">Conecte-se com outros profissionais, <br> troque experiências e alavanque sua carreira!</h2>
    <div v-if="edit || !$auth.user.need || !$auth.user.need.length">
      <MatchForm @input="edit = false" />
    </div>
    <div v-else>
      <v-row class="mb-3">
        <v-col cols="12" md="6">
          <v-card color="tertiary pa-6">
            <h3 class="mb-3"><strong class="primary--text">Ofereço</strong> ajuda/mentoria em: </h3>
            <div>
              <v-chip v-for="offer in $auth.user.offer" :key="'offer-' + offer" class="mr-1">{{ offer }}</v-chip>
              <v-btn icon @click="edit = true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="tertiary pa-6">
            <h3 class="mb-3"><strong class="primary--text">Preciso</strong> de ajuda/mentoria em: </h3>
            <div>
              <v-chip v-for="need in $auth.user.need" :key="'need-' + need" class="mr-1">{{ need }}</v-chip>
              <v-btn icon @click="edit = true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div v-if="fullMatches && fullMatches.length">
        <h3 class="mb-3">Matchs perfeitos:</h3>
        <MatchList :matches="fullMatches" />
      </div>
      <div v-if="offerMatches && offerMatches.length">
        <h3 class="mb-3">Quem posso ajudar:</h3>
        <MatchList :matches="offerMatches" />
      </div>
      <div v-if="needMatches && needMatches.length">
        <h3 class="mb-3">Quem pode me ajudar:</h3>
        <MatchList :matches="needMatches" />
      </div>
      <div v-if="notMatched && notMatched.length">
        <h3 class="mb-3">Outros:</h3>
        <MatchList :matches="notMatched" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      users: [],
      edit: !this.$auth.user.need
    }
  },
  computed: {
    fullMatches () {
      return this.users.filter(user => {
        return user.need.find(need => (this.$auth.user.offer.includes(need))) && user.offer.find(offer => (this.$auth.user.need.includes(offer)))
      })
    },
    offerMatches () {
      return this.users.filter(user => {
        return !this.fullMatches.find(u => u._id === user._id) && user.need.find(need => (this.$auth.user.offer.includes(need)))
      })
    },
    needMatches () {
      return this.users.filter(user => {
        return !this.fullMatches.find(u => u._id === user._id) && user.offer.find(offer => (this.$auth.user.need.includes(offer)))
      })
    },
    notMatched () {
      return this.users.filter(user => {
        return !this.fullMatches.find(u => u._id === user._id) && !this.needMatches.find(u => u._id === user._id) && !this.offerMatches.find(u => u._id === user._id)
      })
    },
    settings () {
      return this.$store.state.settings
    }
  },
  async created () {
    this.users = await this.$axios.$get('/api/users/match')
  }
}
</script>
