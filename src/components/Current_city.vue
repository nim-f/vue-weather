<template lang="pug">
  .container.has-text-centered
    .title(v-if="weather") {{ weather.main.temp }} &deg;C
    .subtitle {{ address.city }}, {{ address.country}}

</template>

<script>
  export default {
    name: 'current_city',
    props: ['address', 'weather'],
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
