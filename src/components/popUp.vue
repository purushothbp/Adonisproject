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
      <tr v-for="item in details" :key="item.name">
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td>{{item.mobile}}</td>
        <td>{{item.gender}}</td>
        <td>{{item.city}}</td>
        <td>
          <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
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
            max-width="500px"
          >
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
                    v-model="valid"
                      lazy-validation>
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                        placeholder="enter name"
                        :rules="[
                          v => !!v || 'Name is required',
                          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                        ]"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.mobile"
                        :rules="[
                            v => !!v || 'mobile no  is required',
                            v => (/[0-9]/.test(v)) || 'mobile number must be valid',
                            v =>v && v.length==10|| 'mobile no must be of size 10']"
                        label="mobile no"
                      ></v-text-field>
                      <v-radio-group
                      column
                      v-model="editedItem.gender"
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
                      <v-text-field
                        v-model="editedItem.email"
                        :rules="[
                            v => !!v || 'E-mail is required',
                            v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']"
                        label="E-mail"
                      ></v-text-field>
                      <v-select
                       v-model="editedItem.interest"
                       :items="editedItem.list"
                       label="Select"
                         multiple
                         hint="select yout interests"
                         persistent-hint
                         ></v-select>
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
                <v-btn
                v-if="fork"
                @click="insert">
                submit</v-btn>
                <v-btn 
                v-else
                @click="save">
                save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-simple-table>
  </template>
  
  
  <script>
import  Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        details: [],
        editedIndex: -1,
        editedItem: {
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
        },
        defaultItem: {
          name: '',
          age: '',
          gender:'',
          city: '',
          email: '',
          cities:[
          'Chennai','madurai','Theni','Thanjavur','Trichy','Sivagangai','korkai','Tutukorin',
          'Thirunelveli','Vilupuram','Thiruvallur','Chengalpattu','Virudhunagar','Sivagasi'
        ],
          mobile:'',
        },
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
      created () {
        this.initialize()
      },
      mounted(){
    Vue.axios.get("http://127.0.0.1:45389/select").
            then((res)=>{
            this.forms=res.data;
            console.warn(res.data);
      })},
      methods: {
        async  insert(){
       await Vue.axios.post("http://127.0.0.1:45389/insert",{name:this.name, city:this.city,
          mobile:this.mobile, gender:this.gender, email:this.email,}).then((res)=>{
            console.warn(res)          
          })
        },
        read(){
            Vue.axios.get("http://127.0.0.1:45389/select").
            then((res)=>{
            this.forms=res.data;
            console.warn(res.data);
            })
        },
        async deleteItem(id){
           await axios.delete(`http://127.0.0.1:45389/delete/${id}`)
           this.read()
         },
        clearForm(){
          this.name = '',
          this.gender = '',
          this.city = 0,
          this.email =  '',
          this.interest = [],
          this.mobile = ''
        },
        editItem (item) {
          this.editedIndex = this.details.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
        
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
        save () {
          
        },
      },
    }
  </script>