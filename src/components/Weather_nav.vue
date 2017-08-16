<template lang="pug">
  .nav
    .container
      .nav-left
        .nav-item Vue weather
      //.nav-toggle
        span
        span
        span
      .nav-right
        .control.nav-item
          vue-google-autocomplete(id="map"
            types="(cities)"
            classname="input"
            placeholder="Start typing"
            v-on:placechanged="getAddressData")



</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  export default {
    components: {
      VueGoogleAutocomplete
    },
    name: 'Nav',
    data () {
      return {
        address: {}
      }
    },
    methods: {
      /**
       * When the location found
       * @param {Object} addressData Data of the found location
       * @param {Object} placeResultData PlaceResult object
       */
      getAddressData: function (addressData, placeResultData) {
        this.address = {
          country: addressData.country,
          city: addressData.locality
        }

        this.$emit('chooseCity', this.address)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
