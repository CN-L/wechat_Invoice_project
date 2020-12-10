import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import './filters/index'
import './assets/icons/iconfont.css'
import { Button, Swipe, SwipeItem, Toast, Dialog, Collapse, CollapseItem, Icon, Form, Field, Cell, CellGroup, Popup, Picker, Col, Row, RadioGroup, Radio, ImagePreview } from 'vant'
import './style/index.styl'
import VueScroller from 'vue-scroller'
import './utils/directive'

Vue.config.productionTip = false
Vue.use(Swipe)
Vue.use(RadioGroup)
Vue.use(ImagePreview)
Vue.use(Toast)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Picker)
Vue.use(Form)
Vue.use(SwipeItem)
Vue.use(Collapse)
Vue.use(Popup)
Vue.use(VueScroller)
Vue.use(CollapseItem)
Vue.use(Col)
Vue.use(Row)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
