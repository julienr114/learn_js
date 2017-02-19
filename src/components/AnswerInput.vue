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
    .success(v-if="good") {{ input }}
    .error(v-if="bad") {{ input }} => {{ answer }}
</template>

<style scoped>
.control.has-addons .input {
  width: 100%
}
</style>
