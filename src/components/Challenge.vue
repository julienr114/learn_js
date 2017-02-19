<script>

  import AnswerInput from './AnswerInput'
  import Operator from './operator'

  export default {
    components: {
      AnswerInput
    },
    data () {
      return {
        state: 'inprogress',
        challenge: {}
      }
    },
    created () {
      let operator = this.$parent.operatorsByLevel[this.$parent.level][Math.floor(Math.random() * this.$parent.operatorsByLevel[this.$parent.level].length) + 1]
      this.challenge = new Operator (
        operator.name,
        operator.level,
        operator.variables,
        operator.template,
        operator.result
      )
    },
    methods: {
      submit (input) {
        this.$parent.step++
        if(this.challenge.result === input) {
          this.state = "good"
          this.$parent.goodAnswer()
        } else {
          this.state = "bad"
          this.$parent.badAnswer()
        }
      }
    }
  }
</script>

<template lang="pug">
  .opperation.box
    pre
      code {{ challenge.template }}
    answer-input(:state="state", :answer="challenge.result")
</template>

<style scoped>
  .opperation:not(:last-child) {
    margin-bottom: 15px;
  }
</style>
