<template>
    <div></div>
</template>

<script>
import { apiLogin } from '../../api/blank'
// import { mapActions } from 'vuex'

export default {
  name: 'blank',
  data() {
    return {}
  },
  mounted() {
    this.handleLogin()
  },
  methods: {
    // ...mapActions('home', ['wxlogin']),
    async handleLogin() {
      const { data } = await apiLogin()
      if (data.code === 1020000) {
        const a = document.createElement('a')
        a.href = data.content
        a.click() //触发点击事件*/
      }
    }
  }
}
</script>

<style scoped>

</style>
