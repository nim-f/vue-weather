<template lang="pug">
  section.hero
    .hero-body
      h1.title 5 days
      .subtitle {{ five_date }}

      .five_table(v-if="data")
        .columns.is-gapless.is-desktop
          div.column.five_column(v-for="(value, key, index) in five_weather")
            .has-text-centered.is-size-5: b {{ key }} {{ month(value[0].dt) }}

            div.five_cell.is-flex(v-for="item in value")
                span {{ toDate(item.dt) }} -&nbsp;
                span  {{ item.main.temp }}&nbsp;&deg;C

</template>

<script>
  import moment from 'moment'

  export default {
    props: ['data'],
    name: 'five_days',
    data () {
      return {}
    },
    methods: {
      toDate (timestamp) {
        return moment.unix(timestamp).format('HH:mm')
      },
      month (timestamp) {
        return moment.unix(timestamp).format('MMMM')
      }
    },
    computed: {
      five_date () {
        return moment().format('DD MMMM') + ' - ' + moment(new Date()).add(4, 'days').format('DD MMMM')
      },
      five_weather () {
        let weatherDates = {}
        this.data.list.forEach((item) => {
          item.day = moment.unix(item.dt).format('DD')
          if (!weatherDates[item.day]) {
            weatherDates[item.day] = []
          }
          weatherDates[item.day].push(item)
        })
        return weatherDates
      }
    }
  }
</script>

<style lang="stylus">
  .five
    &_table
      width 100%
    &_cell
      justify-content center
      padding 10px
    &_column
      border-right 1px solid #ccc
      &:last-child
        border none

</style>
