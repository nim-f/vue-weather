<template lang="pug">
  section.hero
    .hero-body
      h1.title Today
      .subtitle {{ today_date }}
      table.table.is-striped.weather_table(v-if="data")
        thead
          tr
            th Time
            th.has-text-right Weather
        tr(v-for="item, index in today_weather")
          td.time_text {{ toDate(item.dt) }} &nbsp;
          td.temp_text.has-text-right {{ item.main.temp }} &deg;C
</template>

<script>
  import moment from 'moment'

  export default {
    props: ['data'],
    name: 'today',
    data () {
      return {}
    },
    methods: {
      toDate (timestamp) {
        return moment.unix(timestamp).format('HH:mm')
      }
    },
    computed: {
      today_date () {
        return moment().format('DD MMMM')
      },
      today_weather () {
        console.log(this.data)
        let todayWeather = this.data.list.filter(function (weather) {
          return moment.unix(weather.dt).format('DD') === moment().format('DD')
        })
        return todayWeather
      }
    }
  }
</script>

<style lang="stylus">
  .weather_table
    width 300px
    max-width 100%
</style>
