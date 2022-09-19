import Vue from 'vue'
import App from './App.vue'
import findVal from './components/findVal.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.component('findVal',findVal)

Vue.directive('thousand-seperator', {
  componentUpdated(el, binding,vnode) {
      binding.value=binding.value.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,",")
      console.log(el)
      console.log(binding)
      vnode.context.formInput.mobile=binding.value
    }
  }),
Vue.filter('place',function(str){
  if(str.length>10){
    return str.slice(0,10)+'...'
  }
  else{
    return str
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
