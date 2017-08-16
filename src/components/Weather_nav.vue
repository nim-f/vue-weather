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
          input(class="input" type="text" placeholder="Choose your city")


</template>

<script>
  export default {
    name: 'Nav',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
