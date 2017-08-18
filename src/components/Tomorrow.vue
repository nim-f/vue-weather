<template lang="pug">
  section.hero
    .hero-body
      h1.title Tomorrow
      .subtitle {{ tomorrow_date }}

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
    name: 'tomorrow',
    data () {
      return {}
    },
    methods: {
      toDate (timestamp) {
        return moment.unix(timestamp).format('HH:mm')
      }
    },
    computed: {
      tomorrow_date () {
        return moment(new Date()).add(1, 'days').format('DD MMMM')
      },
      today_weather () {
        let todayWeather = this.data.list.filter(function (weather) {
          return moment.unix(weather.dt).format('DD') === moment(new Date()).add(1, 'days').format('DD')
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
