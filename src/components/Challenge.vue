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
    computed: {
      iconStyle () {
        return {
          state: true,
          good: this.state === 'good',
          bad: this.state === 'bad',
        }
      }
    },
    created () {
      let operator = this.$parent.operatorsByLevel[this.$parent.level][Math.floor(Math.random() * this.$parent.operatorsByLevel[this.$parent.level].length)]
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
        if(this.challenge.result.toString() === input) {
          this.state = "good"
          this.$parent.goodAnswer()
        } else {
          this.state = "bad"
          this.$parent.step++
          this.$parent.badAnswer()
        }
      }
    }
  }
</script>

<template>
  <div class="opperation box">
    <div :class="iconStyle">
      <span class="icon">
        <i v-if="state === 'good'" class="fa fa-check" aria-hidden="true"></i>
        <i v-if="state === 'bad'" class="fa fa-times" aria-hidden="true"></i>
      </span>
    </div>
    <span v-highlightjs>
      <code class="javascript">
        {{ challenge.template }}
      </code>
    </span>
    <answer-input :state="state" :answer="challenge.result"></answer-input>
  </div>
</template>

<style scoped>
  code {
    padding: 0;
    white-space: pre-line;
  }
  .opperation {
    position: relative;
    margin-bottom: 15px;
  }
  .opperation:last-child {
    margin-bottom: 40px;
  }
  .state {
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    padding: 7px;
    border-top-right-radius: 5px;
  }
  .state.good {
    background-color: #2ecc71;
  }
  .state.bad {
    background-color: #c0392b;
  }
</style>
