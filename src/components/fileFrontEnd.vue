<template>
    <v-data-table
      :headers="values"
      :items="details"
      sort-by="calories"
      class="elevation-1"
    >
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
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field 
                            v-model="formInput.name"
                            label="Name"
                            placeholder="enter name"
                           :rules="[
                            v => !!v || 'Name is required',
                            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                      ]"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                            v-model="formInput.mobile"
                            label="mobile"
                            :rules="[
                            v => !!v || 'mobile no  is required',
                            v =>v && v.length==10|| 'mobile no must be of size 10',
                            v => (/[0-9]/.test(v)) || 'mobile number must be valid']"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="formInput.email"
                            label="E-mail"
                            :rules="[
                            v => !!v || 'E-mail is required',
                            v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']"></v-text-field>
                        </v-col>
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
                         <v-col >
                         <v-btn @click="editItem(item)"> 
                            <v-icon
                            small>mdi-pencil
                          </v-icon></v-btn>
                          <v-btn @click="deleteItem(item.id)">
                          <v-icon  small > 
                            mdi-delete </v-icon></v-btn></v-col>
                    </v-row>
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
      <template>
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template >
        <v-card-actions>
            <v-btn @click="editItem(item)"> 
                <v-icon
                small>mdi-pencil
              </v-icon></v-btn>
        </v-card-actions>
            <v-card-actions>
                <v-btn @click="deleteItem(item.id)">
                    <v-icon  small > 
                      mdi-delete 
                    </v-icon>
                </v-btn>
            </v-card-actions>
      </template>
    </v-data-table>
  </template>

<script>
    import  Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import FindVal from './findVal.vue'
    Vue.use(VueAxios, axios)
    var band
      export default {
        data(){
          return{
            form: {},
            values: [
                {
                   text: 'Name',align: 'start',sortable: true,value: 'name',
                },{
                    text: 'Mobile',align: 'start',sortable:true,value: 'mobile',
                },{
                    text:'Mail-id',align:'start',sortable:true,value:'email',
                },{
                    text:'Gender',align:'start',sortable:true,value:'gender',
                },{
                    text:'city',align:'start',sortable:true,value:'gender',
                },{
                    text:'Action',sortable:false,value:'action',
                },
            ],
            val :'',
            dialog: false,
            fork: true,
            dialogDelete: false,
            details: [],
            editedIndex: -1,
            forms: undefined,
            formInput:{
            name: "",
            age: "",
            gender: "",
            city: 0,
            email: "",
            mobile: "",
            action:"",
        },
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
        mounted() {
            Vue.axios.get("http://127.0.0.1:3333/select").
                then((res) => {
                this.details = res.data;
                console.warn(res.data);
            });
        },
        methods: {
            async insert() {
                await Vue.axios.post("http://127.0.0.1:3333/insert", this.formInput)
                .then((res) => {
                    console.warn(res);
                });
            },
            read() {
                Vue.axios.get("http://127.0.0.1:3333/select").
                    then((res) => {
                    this.details = res.data;
                    console.warn(res.data);
                });
            },
            async deleteItem(id) {
                await axios.delete(`http://127.0.0.1:3333/delete/${id}`);
                this.read();
            },
            Changed(value) {
                console.log(value);
                this.list = value.data;
            },
            editItem(item) {
                this.fork = false;
                this.dialog = true;
                band = item;
                this.formInput={name :item.name,email : item.email,
                gender : item.gender,city : item.city,mobile : item.mobile
                }
            },
            async save() {
                this.button = true;
                await axios.put(`http://127.0.0.1:3333/update/${band.id}`,this.formInput)
                    .then(response => {
                    console.log(response);
                });
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
            }
        },
        components: { FindVal }
    }
    </script>