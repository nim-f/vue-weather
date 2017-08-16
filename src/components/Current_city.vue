<template lang="pug">
  .container.has-text-centered
    .title(v-if="weather") {{ weather.main.temp }} &deg;C
    .subtitle {{ address.city }}, {{ address.country}}

</template>

<script>
  const apiKey = '72cd3fe13ceb31d0b863319d463153a9'
  import axios from 'axios'
  export default {
    name: 'current_city',
    props: ['address'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        weather: null
      }
    },
    methods: {
      updateWeather () {
        let vm = this
        const apiLink = location.protocol + '//api.openweathermap.org/data/2.5/weather?q=' + this.address.city + '&APPID=' + apiKey + '&units=metric'
        axios.get(apiLink)
        .then(function (response) {
          console.log(response)
          vm.weather = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    mounted () {
      this.updateWeather()
    },
    watch: {
      address: function () {
        this.updateWeather()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
