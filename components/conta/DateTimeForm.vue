<template>
  <b-form-group :label="label">
    <b-row no-gutters>
      <b-col md="6">
        <b-form-datepicker v-model="date" v-bind="{ labelNoDateSelected: 'Selecione uma data' }" locale="pt-BR" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" @input="changed" />
      </b-col>
      <b-col v-if="date" md="6">
        <b-form-timepicker v-model="time" v-bind="{ labelNoTimeSelected: 'Tem hora?' }" locale="pt-BR" @input="changed" />
      </b-col>
    </b-row>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Data e hora'
    }
  },
  data () {
    return {
      date: null,
      time: null
    }
  },
  created () {
    if (this.value) {
      const dateArr = this.value.split('T')
      this.date = dateArr[0]
      this.time = dateArr[1].split('.')[0]
    }
  },
  methods: {
    changed () {
      let finalDate = this.date + 'T' + '00:00:00.000Z'
      if (this.time) {
        finalDate = this.date + 'T' + this.time + '.000Z'
      }
      this.$emit('input', finalDate)
    }
  }
}
</script>
