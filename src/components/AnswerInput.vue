<script>
  export default {
    props: {
      state: {default: 'inprogress'},
      answer: {}
    },
    data () {
      return {
        randomId: 'input-' + Math.random(),
        input: ''
      }
    },
    computed: {
      inProgress () {
        return this.state === 'inprogress'
      },
      good () {
        return this.state === 'good'
      },
      bad () {
        return this.state === 'bad'
      },
      inputForTemplate () {
        if (this.input === '') {
          return "''"
        } else if (!isNaN(this.input)) {
          return parseInt(this.input)
        } else {
          return "'" + this.input + "'"
        }
      }
    },
    methods: {
      submit () {
        this.$parent.submit(this.input)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        document.getElementById(this.randomId).focus()
      })
    }
  }
</script>

<template lang="pug">
  .control.has-addons()
    input.input(
      @keyup.enter="submit",
      :id="randomId",
      placeholder="?",
      v-if="inProgress",
      v-model="input"
    )
    button.button.is-primary(
      @click="submit",
      v-if="inProgress"
    ) >
    code
      span.success(v-if="good") {{ inputForTemplate }}
      span.error(v-if="bad")
        span.answer {{ inputForTemplate }}
        span.icon.arrow
          i.fa.fa-long-arrow-right(aria-hidden="true")
        span.correction {{ answer }}
</template>

<style scoped>
code {
  font-size: 16px;
  background-color: transparent;
  padding-left: 0px; 
}
.control.has-addons .input {
  width: 100%
}
.success {
  color: #34B6AF;
}
.error .answer {
  color: #FAB;
}
.error .arrow {
  color: #bdc3c7;
  margin: 0 5px;
}
.error .correction {
  color: #E22968;
}
</style>
