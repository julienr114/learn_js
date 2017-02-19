<script>

  import AnswerInput from './AnswerInput'
  import Operator from './operator'

  export default {
    components: {
      AnswerInput
    },
    props: {
      operator: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        state: 'inprogress',
        challenge: {}
      }
    },
    created () {
      this.challenge = new Operator (
        this.operator.name,
        this.operator.level,
        this.operator.variables,
        this.operator.template,
        this.operator.result
      )
    },
    methods: {
      submit (input) {
        if(this.challenge.result === input) {
          this.state = "good"
          this.$parent.step++
          this.$parent.level++
        } else {
          this.state = "bad"
          this.$parent.step++
          if (this.$parent.level < 0) {
            this.$parent.level--
          }
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
