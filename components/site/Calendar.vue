<template>
  <v-calendar class="custom-calendar" locale="pt-BR" :attributes="event_list">
    <div slot="day-content" slot-scope="{ day, attributes }" class="flex flex-col h-full z-10 overflow-hidden">
      <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
      <div class="flex-grow">
        <p v-for="attr in attributes" :key="attr.key" class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1">
          <n-link :to="'/agenda/' + attr.customData._id">
            <b-badge pill color="success">{{ attr.customData.title }}</b-badge>
          </n-link>
        </p>
      </div>
    </div>
  </v-calendar>
</template>
<script>
export default {
  props: {
    events: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      event_list: []
    }
  },
  created() {
    this.event_list = this.events.map(event => {
      const dates = { start: event.start_at }
      if (event.end_at) {
        dates.end = event.end_at
      } else {
        dates.end = event.start_at
      }
      return {
        customData: event,
        dates,
        key: event._id
      }
    })
  }
}
</script>
