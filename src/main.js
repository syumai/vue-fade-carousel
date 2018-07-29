import Vue from 'vue'
import VueUi from '@vue/ui'
import App from './App.vue'
import '@vue/ui/dist/vue-ui.css'

Vue.config.productionTip = false
Vue.use(VueUi)

new Vue({
  render: h => h(App)
}).$mount('#app')
