import  Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

 async function reading(){
    var formInput=[];
    await Vue.axios.get("http://127.0.0.1:3333/select").
                then((res) => {
                formInput = res.data

            });
    return formInput
 }
export default reading;