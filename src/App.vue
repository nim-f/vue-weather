<template lang="pug">
  #app
    .hero.is-dark.is-medium.is-bold
      .hero-head
        weather-nav(@chooseCity="changeCity")
      .hero-body
        .waiting.has-text-centered(v-if="!address") Checking for location...
        current-city(v-if="address", :address="address", :weather="weather")
      .hero-foot
        .container
          .tabs
            ul
              li.is-active: router-link(to="/") Today
              li: router-link(to="/tomorrow") Tomorrow
              li: router-link(to="/five_days") 5 days
              li: router-link(to="/sixteen_days") 16 days

    .container(v-if="weather_5day")
      router-view(:data="weather_5day")

</template>

<script>
const apiKey = '72cd3fe13ceb31d0b863319d463153a9'
import axios from 'axios'
import geolocator from 'geolocator'
import moment from 'moment'
import WeatherNav from './components/Weather_nav.vue'
import CurrentCity from './components/Current_city.vue'

let address = JSON.parse(localStorage.getItem('address'))
/*
class Weather {
  constructor (data, type) {
    this.originalData = data;
    for (let field in data) {
      this[field] = data[field];
    }
  }

  updateWeather (type) {
    this.api = location.protocol + '//api.openweathermap.org/data/2.5/'+ type +'?q=' + this.city + '&APPID=' + apiKey + '&units=metric'
    axios.get(this.api)
    .then(function (response) {
      console.log(response)
      vm.weather = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
*/
export default {
  components: {
    WeatherNav, CurrentCity
  },
  name: 'app',
  data () {
    return {
      address: address,
      updateByUser: false,
      weather: null,
      weather_5day: null
    }
  },
  methods: {
    toDate (timestamp) {
      return moment.unix(timestamp).format('DD MMMM HH:mm')
    },
    changeCity (address) {
      this.address = address
      this.updateByUser = true
      this.updateWeather()
      this.get5dayWeather()
    },
    updateWeather () {
      let vm = this
      const apiLink = location.protocol + '//api.openweathermap.org/data/2.5/weather?q=' + this.address.city + '&APPID=' + apiKey + '&units=metric'
      axios.get(apiLink)
      .then(function (response) {
//        console.log(response)
        vm.weather = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    get5dayWeather () {
      let vm = this
      const apiLink = location.protocol + '//api.openweathermap.org/data/2.5/forecast?q=' + this.address.city + '&APPID=' + apiKey + '&units=metric'
      axios.get(apiLink)
      .then(function (response) {
//        console.log('5day', response)
        vm.weather_5day = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    if (address) {
      this.updateWeather()
      this.get5dayWeather()
    }
    let vm = this
    geolocator.config({
      language: 'en',
      google: {
        version: '3',
        key: 'AIzaSyDqd2TqDt6LHrrH5d1mpA1mpqtrcO2CKug'
      }
    })

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumWait: 1000,     // max wait time for desired accuracy
      maximumAge: 0,          // disable cache
      desiredAccuracy: 30,    // meters
      fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
      addressLookup: true    // requires Google API key if true
      // timezone: true         // requires Google API key if true
      // map: 'map-canvas',      // interactive map element id (or options object)
      // staticMap: true         // map image URL (boolean or options object)
    }
    geolocator.locate(options, function (err, location) {
      if (err) return console.log(err)
      console.log(location)
      if (!vm.updateByUser) {
        vm.address = {
          country: location.address.country,
          city: location.address.city
        }
        vm.updateWeather()
        localStorage.setItem('address', JSON.stringify(vm.address))
      }
    })
  }
}
</script>

<style lang="sass">
  // 1. Import the initial variables
  @import "~bulma/sass/utilities/initial-variables"

  // 2. Set your own initial variables
  // Update blue
  //$blue: #72d0eb
  // Add pink and its invert
  //$pink: #ffb3b3
  //$pink-invert: #fff
  // Add a serif family
  //$family-serif: "Merriweather", "Georgia", serif

  // 3. Set the derived variables
  // Use the new pink as the primary color
  //$primary: $pink
  //$primary-invert: $pink-invert
  // Use the existing orange as the danger color
  //$danger: $orange
  // Use the new serif family
  //$family-primary: $family-serif

  // 4. Import the rest of Bulma
  @import "~bulma"

  .logo
    font-weight: 700
    font-size: 60px
</style>
