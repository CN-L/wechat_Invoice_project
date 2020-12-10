<template>
  <div id="footer-bar">
    <div v-for='(item, index) in barList' :key='index' class="bar-item" @click="selectBarTap(index)">
      <div :class="active === index ? 'active' : ''">{{item.title}}</div>
      <img :src="active === index ? item.activeIcon : item.icon" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  data() {
    return {
      barList: [
        { icon: require('../../assets/images/home.png'), title: '首页', activeIcon: require('../../assets/images/home1.png') },
        { icon: require('../../assets/images/ziyuan.png'), title: '我的', activeIcon: require('../../assets/images/ziyuan1.png') }
      ]
    }
  },
  computed: {
    active: function() {
      let active = 0
      switch (this.$route.path) {
        case '/home':
          active = 0
          break
        case '/my':
          active = 1
      }
      return active
    }
  },
  methods: {
    // 路由跳转
    selectBarTap(index) {
      switch (index) {
        case 0:
          this.$router.push('/home')
          break
        case 1:
          this.$router.push('/my')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  #footer-bar
    font-size 16px
    position fixed
    display flex
    background #ffff
    bottom 0
    left 0
    right 0
    height 60px
    width 100%
    border-top solid 1px #EBEEF5
    .active
      color #036eb1
      font-family 700
    .bar-item
      box-sizing border-box
      padding 0 3px
      display flex
      flex-direction column
      justify-content center
      align-items center
      width 50%
      height 100
      img
        width 25px
        height 25px
</style>
