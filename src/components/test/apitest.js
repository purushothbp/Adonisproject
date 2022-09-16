import  Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

class AXIOS{
    constructor() {

    }
    async read(url){
        return await axios.get(url)
 }
 async insert(url,val) {
    return await axios.post(url,val)
}
async delete(url,val) {
    await axios.delete(url,val)
}
async update(url,val){
    await axios.put(url,val)
}
}
const api= new AXIOS
export default api;