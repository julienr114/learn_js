<template lang="pug">
  #app
    nav.nav.has-shadow
      .nav-left
        .nav-item
          img(src="./assets/logo_js.png", )
          span.logo LearnJS
    .container
      .challenge-container
        challenge(v-for="i in step", :key="i")
</template>

<script>

import Challenge from './components/Challenge'
import operators from './operators.json'

import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'

export default {
  name: 'app',
  components: {
    Challenge
  },
  data () {
    return {
      step: 1,
      progress: 0,
      operators: operators
    }
  },
  computed: {
    operatorsByLevel () {
      return groupBy(this.operators, 'level')
    },
    levelsCount () {
      return keys(this.operatorsByLevel).length
    },
    level () {
      let level = 1
      let stage = 0
      for (let i = 1; i <= this.levelsCount; i++) {
        stage += (this.operatorsByLevel[i].length * 2)
        if (this.progress >= stage) {
          level++
        }
      }
      return level
    }
  },
  methods: {
    goodAnswer () {
      this.progress++
    },
    badAnswer () {
      if (this.progress > 0) {
        this.progress--
      }
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
