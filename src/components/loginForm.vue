<template>
    <v-app>
    <v-form ref="form"
    v-model="valid"
    lazy-validation
  >   <v-container>
            <v-text-field
            v-model="name"
            :counter="20"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
          v-model="phoneNumber"
          :rules="phrules"
          :counter="10"
           label="Mobile"
          required
        ></v-text-field>
            <p>Gender</p>
            <v-radio-group v-model="radioGroup">
              <v-radio
              label="Male"
              value="Male"
              ></v-radio>
              <v-radio
                label="Female"
                value="Female"
            ></v-radio>
            </v-radio-group>
            <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'select one city']"
            label="city"
            required
          ></v-select>
          <p>Interest</p>
          <v-checkbox 
          v-model="selected"
          v-for='i in names' 
          :key="i.id" 
          :label="i.name"
          :value="i.name"
          hide-details
          required>
            </v-checkbox>
        </v-container>
        <v-btn
        @click="validate()"
        color="white"
        class="mr-4"
              >
        submit
      </v-btn>
    
    </v-form>
    <v-dialog v-model="dialog" width="1000px" class="mr-4">
      <template v-slot:activator="{ on, attrs }">
          <v-btn color="green " dark v-bind="attrs" v-on="on">
              PopUP
          </v-btn>
      </template>
      <v-card>
          <v-card-title class="text-h5">
              Form Data
          </v-card-title>
          <v-card-text>
              <v-data-table>
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        New Item
                      </v-btn>
                    </template>
              </v-data-table>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false">
                  CONFIRM
              </v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</v-app>

</template>

<script>
        export default {

  data: () => ({
    name : '',
    phoneNumber : '',
    select: '',
    email: '',
    radioGroup:'',
    valid :'',
    nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        v => /^[a-zA-Z]+$/.test(v) || 'Name must be valid'
      ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phrules:[
        v => !!v|| 'mobile number is required',
        v => (v && v.length <=11) || 'mobile number must be 10 numbers',
        v => /^[0-9]+$/.test(v) || 'Mobile Number must be valid'      ],
      city: null,
        items:[
        'Chennai','madurai','Theni','Thanjavur','Trichy','Sivagangai','korkai','Tutukorin',
        'Thirunelveli','Vilupuram','Thiruvallur','Chengalpattu','Virudhunagar','Sivagasi'
      ],

      names:[
        {id:1,name:'Kabadi'},
        {id:2,name:'cricket'} , 
        {id:3,name:'hockey'} ,
        {id:4,name:'Hockey' },
        {id:5,name:'kho-kho'},
      ],
      selected:[],
     }),
      methods: {
      validate () {
        this.$refs.form.validate()
            const arr = {
            name : this.name,
            email : this.email,
            phoneNumber:this.phoneNumber,
            gender :this.gender,
            select: this.select,
            names:this.selected,
          }
          console.log(JSON.stringify(arr))
          }
      }
    };
</script>