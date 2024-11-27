import Vue from 'vue'
import App from './App'
import './assets/styles/global.css'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
