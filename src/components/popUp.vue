<template>
    <v-data-table
      :headers="headers"
      :items="details"
      class="elevation-1"
    ><template v-slot:top>
        <v-toolbar
          flat
        ><v-toolbar-title class="text h5">Form Details</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          ><template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                popUp
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                    <v-text-field
                    v-model="editedItem.name"
                    :counter="20"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                  v-model="editedItem.phoneNumber"
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
                    v-model="editedItem.select"
                    :items="items"
                    :rules="[v => !!v || 'select one city']"
                    label="city"
                    required
                  ></v-select>
                  <p>Interest</p>
                  <v-checkbox 
                  v-model="editedItem.selected"
                  v-for='i in names' 
                  :key="i.id" 
                  :label="i.name"
                  :value="i.name"
                  hide-details
                  required>
                    </v-checkbox>
                </v-container>
                <v-btn
                @click="save"
                color="white"
                class="mr-4"
                      >
                submit
              </v-btn>
            </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template>
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>p
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </template>

  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'Name',
          },
          { text: 'E-mail', value: 'E-mail' },
          { text: 'phoneNumber', value: 'mobile' },
          { text: 'Gender', value: 'Gender' },
          { text: 'City', value: 'City' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
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
        details:[],
        editedIndex: -1,
        editedItem:{
        name: '',
        Email: 0,
        mobile: 0,
        Gender: 0,
        selected: 0,
      },
        defaultItem: {
        name: '',
        Email: 0,
        mobile: 0,
        Gender: 0,
        selected: 0,
      },
      watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  
        methods: { 
            editItem (item) {
        this.editedIndex = this.details.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.details.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.details.splice(this.editedIndex, 1)
        this.closeDelete()
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
        if (this.editedIndex > -1) {
          Object.assign(this.details[this.editedIndex], this.editedItem)
        } else {
          this.details.push(this.editedItem)
        }
        this.close()
      },
        }
    })
}
</script>