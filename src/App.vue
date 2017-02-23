<template lang="pug">
  #app
    .menu
      .logo
        img(src="./assets/logo_js.png", )
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
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener("beforeunload", function (e) {
          var confirmationMessage = 'It looks like you have been editing something. '
                                  + 'If you leave before saving, your changes will be lost.';

          (e || window.event).returnValue = confirmationMessage; //Gecko + IE
          return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
      });
    })
  }
}
</script>

<style>
  .menu {
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 2;
  }
  .menu .logo img {
    width: 50px;
  }
  .challenge-container {
    margin: 100px 5px 0 5px;
    max-width: 600px;
  }
</style>
