<template>
  <v-simple-table>
  <thead>
    <tr><th>Name
      <button @click="asc('/nameA')"><v-icon x-small>mdi-arrow-up</v-icon></button>
      <button @click="desc('/nameD')"><v-icon x-small>mdi-arrow-down</v-icon></button>
    </th>
    <th class="text-left">E-mail
      <button @click="asc('/emailA')"><v-icon x-small>mdi-arrow-up</v-icon></button>
      <button @click="desc('/emailD')"><v-icon x-small>mdi-arrow-down</v-icon></button>
    </th>
    <th class="text-left">Mobile
      <button @click="asc('/mobileA')"><v-icon x-small>mdi-arrow-up</v-icon></button>
      <button @click="desc('/mobileD')"><v-icon x-small>mdi-arrow-down</v-icon></button>
    </th>
    <th class="text-left">Gender
      <button @click="asc('/genderA')"><v-icon x-small>mdi-arrow-up</v-icon></button>
      <button @click="desc('/genderD')"><v-icon x-small>mdi-arrow-down</v-icon></button>
    </th>
    <th class="text-left">City
      <button @click="asc('/cityA')"><v-icon x-small>mdi-arrow-up</v-icon></button>
      <button @click="desc('/cityD')"><v-icon x-small>mdi-arrow-down</v-icon></button>
    </th>
    <th class="text-left">action</th></tr>
  </thead>
  <tbody>
    <tr v-for="item in forms" :key="item.id">
      <td>{{item.name | place}}</td>
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
            <FindVal @searchTable="getData($event)"/>
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
                      v-model="formInput.name"
                      label="Enter your Name"
                      placeholder="enter name"
                      :rules="[
                        v => !!v || 'Name is required',
                        v => (v && v.length <= 15) || 'Name must be less than 15 characters',
                        v=>(/^[A-Za-z]+$/.test(v)) || 'Enter the valid name',
                      ]"
                    ></v-text-field>
                    <v-text-field
                      v-model="formInput.mobile"
                      v-thousand-seperator="formInput.mobile"
                      :rules="[
                          v => !!v || 'mobile no  is required',
                          v =>v && v.length==10|| 'mobile no must be of size 10',
                          v => (/^[0-9]+$/.test(v)) || 'mobile number must be valid',]"
                      label="Enter mobile number"
                    ></v-text-field>
                    <v-radio-group
                    column
                    v-model="formInput.gender"
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
                  v-model="formInput.city"
                  :items="cities"
                  dense
                  :rules="[v => !!v || 'city is required']"
                  label="City"
                  placeholder="select your city"
                  required
                ></v-autocomplete>
                    <v-text-field
                      v-model="formInput.email"
                      :rules="[
                          v => !!v || 'E-mail is required',
                          v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']"
                      label="Enter E-mail"
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
import api from './test/apitest'
import axios from 'axios'
import VueAxios from 'vue-axios'
import FindVal from './findVal.vue'
Vue.use(VueAxios, axios)
var band
  export default {
    data(){
      return{
        form: {},
        dialog: false,
        fork: true,
        dialogDelete: false,
        details: [],
        editedIndex: -1,
        index:"",
        forms: undefined,
        formInput:{
        name: "",
        gender: "",
        city: "",
        email: "",
        mobile: "",
      },
      VUE_APP_READ:process.env.VUE_APP_READ,
      sortIndex: null,
      sortDir: null,
      cities: [
            "Chennai",
            "madurai",
            "Theni",
            "Thanjavur",
            "Trichy",
            "Sivagangai",
            "korkai",
            "Tutukorin",
            "Thirunelveli",
            "Vilupuram",
            "Thiruvallur",
            "Chengalpattu",
            "Virudhunagar",
            "Sivagasi"
        ],
        
    }
  },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    async mounted() {
      this.read()

    },
    methods: {
        async insert() {
            await api.insert(`${this.VUE_APP_READ}/insert`,this.formInput).then((res)=>{
              console.warn(res);
              this.forms=res.data
            })
        },
        async read(){
          await api.read(`${this.VUE_APP_READ}/select`).then((res)=>{
            console.warn(res);
            this.forms=res.data
          })
        },

        async deleteItem(id) {
            await api.delete(`${this.VUE_APP_READ}/delete/${id}`).then((res)=>{
              console.warn(res)
              this.forms=res.data
            })
            this.read();
        },
        Changed(value) {
            console.log(value);
            this.list = value.data;
        },
        async save() {
            this.button = true;
            await api.update(`${this.VUE_APP_READ}/update/${band.id}`,this.formInput)
                .then((res) => {
                console.warn((res));
            });
        },
        editItem(item) {
            this.fork = false;
            this.dialog = true;
            band = item;
            this.formInput={name :item.name,email : item.email,
            gender : item.gender,city : item.city,mobile : item.mobile
            }
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.dialog = false;
            this.$refs.form.reset();
        },
        getData(value){
          this.forms=value.data
        },

        async asc(val){
          await api.read(`${this.VUE_APP_READ}${val}`).then((res)=>{
            console.warn(res);
            this.forms=res.data
          })
        },
        async desc(val){
          await api.read(`${this.VUE_APP_READ}${val}`).then((res)=>{
            console.warn(res);
            this.forms=res.data
          })
        },
    },
    components: { FindVal }
}
</script>
