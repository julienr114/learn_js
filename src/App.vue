<template lang="pug">
  #app
    nav.nav.has-shadow
      .nav-left
        .nav-item
          img(src="./assets/logo_js.png", )
          span.logo LearnJS
    .container
      .challenge-container
        challenge(:operator="operators[0]")
</template>

<script>

import Challenge from './components/Challenge'
import operators from './operators.json'

export default {
  name: 'app',
  components: {
    Challenge
  },
  data () {
    return {
      step: 1,
      level: 0,
      operators: operators
    }
  }
}
</script>

<style>
  .challenge-container {
    margin-top: 30px;
    max-width: 600px;
  }
</style>
