import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

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
