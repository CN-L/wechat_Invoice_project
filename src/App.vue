<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  height 100%
  width 100%
</style>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.isToken()
  },
  methods: {
    ...mapActions('home', ['doRefreshToken']),
    // token刷新
    isToken() {
      let timer = ''
      clearInterval(timer) // 清除定时器
      timer = setInterval(() => {
        if (sessionStorage.getItem('token')) {
          const token = JSON.parse(sessionStorage.getItem('token'))
          const data1 = JSON.parse(token.base2).exp.toString() + '000'
          const data2 = new Date().getTime()
          const data3 = data1 - data2
          if (data3 <= 1000 * 60 * 10) {
            console.log(data3 / 1000 / 60)
            this.doRefreshToken().then((data) => {
              if (data.code === 1020000) {
                console.log('获取token')
              } else {
                this.$router.push('/blank')
              }
            })
          }
        }
      }, 1000 * 60)
    }
  }
}
</script>
