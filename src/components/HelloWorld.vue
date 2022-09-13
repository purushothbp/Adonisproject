<template>
  <v-simple-table>
  <thead>
    <tr><th >Name</th>
    <th class="text-left">E-mail</th>
    <th class="text-left">Mobile</th>
    <th class="text-left">Gender</th>
    <th class="text-left">City</th>
    <th class="text-left">action</th></tr>
  </thead>
  <tbody>
    <tr v-for="item in forms" :key="item.id">
      <td>{{item.name}}</td>
      <td>{{item.email}}</td>
      <td>{{item.mobile}}</td>
      <td>{{item.gender}}</td>
      <td>{{item.city}}</td>
      <td>
        <v-btn @click="editItem(item)"> 
        <v-icon
        small>mdi-pencil
      </v-icon></v-btn>
      <v-btn @click="deleteItem(item.id)">
      <v-icon  small > 
        mdi-delete </v-icon></v-btn>
      </td>
    </tr>
  </tbody>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Table Details</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="black"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              POPUP
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                  <v-form
                  ref="form"
                    lazy-validation>
                    <v-text-field
                      v-model="name"
                      label="name"
                      placeholder="enter name"
                      :rules="[
                        v => !!v || 'Name is required',
                        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                      ]"
                    ></v-text-field>
                    <v-text-field
                      v-model="mobile"
                      :rules="[
                          v => !!v || 'mobile no  is required',
                          v =>v && v.length==10|| 'mobile no must be of size 10',
                          v => (/[0-9]/.test(v)) || 'mobile number must be valid']"
                      label="mobile no"
                    ></v-text-field>
                    <v-radio-group
                    column
                    v-model="gender"
                     label="Gender">
                     <v-radio
                     label="Male"
                     value="male"
                     ></v-radio>
                     <v-radio
                     label="Female"
                     value="female"
                     ></v-radio>
                  </v-radio-group>
                  <v-autocomplete
                  v-model="city"
                  :items="cities"
                  dense
                  :rules="[v => !!v || 'city is required']"
                  label="City"
                  placeholder="select your city"
                  required
                ></v-autocomplete>
                    <v-text-field
                      v-model="email"
                      :rules="[
                          v => !!v || 'E-mail is required',
                          v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']"
                      label="E-mail"
                    ></v-text-field>
                  </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="Grey"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn v-if="fork" @click="insert"> submit </v-btn>
              <v-btn v-else @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-simple-table>
</template>


<script>
import  Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
var band
  export default {
    data: () => ({
      form : {},
      dialog: false,
      fork:true,
      dialogDelete: false,
      details: [],
      editedIndex: -1,
      forms:undefined,
    
        name: '',
        age: '',
        gender: '',
        city: 0,
        email: '',
        cities:[
        'Chennai','madurai','Theni','Thanjavur','Trichy','Sivagangai','korkai','Tutukorin',
        'Thirunelveli','Vilupuram','Thiruvallur','Chengalpattu','Virudhunagar','Sivagasi'
      ],
        mobile:'',
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
   
    mounted(){
    Vue.axios.get("http://127.0.0.1:43163/select").
            then((res)=>{
            this.forms=res.data;
            console.warn(res.data);
      })},
      methods: {
      async  insert(){
       await Vue.axios.post("http://127.0.0.1:43163/insert",{name:this.name, city:this.city,
          mobile:this.mobile, gender:this.gender, email:this.email,}).then((res)=>{
            console.warn(res)          
          })
        },
        read(){
            Vue.axios.get("http://127.0.0.1:43163/select").
            then((res)=>{
            this.forms=res.data;
            console.warn(res.data);
            })
        },
        async deleteItem(id){
           await axios.delete(`http://127.0.0.1:43163/delete/${id}`)
           this.read()
         },
         editItem(item) {
      this.fork=false
      this.dialog = true
      band = item
      this.name = item.name
      this.email = item.email
      this.gender = item.gender
      this.city = item.city
      this.mobile=item.mobile
    
    },
    async save() {
      this.button=true
      band.name = this.name
      band.email = this.email
      band.gender = this.gender
      band.city = this.city
      band.mobile=this.mobile
      await axios.put(`http://127.0.0.1:43163/update/${band.id}`, {
           name : this.name,
           email : this.email,
           gender : this.gender,
           city : this.city,
           mobile:this.mobile
      })
      .then(response => {
          console.log(response);
        })
      },
      close(){
        this.dialog = false
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
      this.dialog=false
       this.$refs.form.reset()
    },
    },
  }
</script>