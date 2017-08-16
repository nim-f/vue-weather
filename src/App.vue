<template lang="pug">
  #app
    .hero.is-dark.is-medium.is-bold
      .hero-head
        weather-nav
      .hero-body
        .waiting.has-text-centered(v-if="!location") Checking for location...
        current-city(v-if="location", :address="location.address")
      .hero-foot
        .container
          .tabs
            //ul
            //  li.is-active: a Today
            //  li: a Tomorrow
            //  l: a Week
            //  li: a Month


    //router-view
</template>

<script>
import geolocator from 'geolocator'
import WeatherNav from './components/Weather_nav.vue'
import CurrentCity from './components/Current_city.vue'
export default {
  components: {
    WeatherNav, CurrentCity
  },
  name: 'app',
  data () {
    return {
      location: null
    }
  },
  mounted () {
    let vm = this
    geolocator.config({
      language: 'en',
      google: {
        version: '3',
        key: 'AIzaSyDqd2TqDt6LHrrH5d1mpA1mpqtrcO2CKug'
      }
    })

    window.onload = function () {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumWait: 10000,     // max wait time for desired accuracy
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
        vm.location = location
      })
    }
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
