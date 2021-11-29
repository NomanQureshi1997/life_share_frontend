<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" height="400">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Donors </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Register New donor
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name"
                      :rules="[() => !!editedItem.name || 'This field is required']"
                      label="Donor Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.age" :rules="[rules.required]" label="Age"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.blood_group"
                        :items="BloodGroup"
                        :rules="[() => !!editedItem.blood_group || 'This field is required']"
                        append-icon="mdi-arrow-down-drop-circle textColor--text"
                        label="BloodGroup"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phone"
                        :rules="[() => !!editedItem.phone || 'This field is required']"
                        label="Phone_Number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text center">Are you sure you want to delete this item?</v-card-title>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          {{ icons.mdiPencil }}
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          {{ icons.mdiDelete }}
        </v-icon>
      </template>
    </v-data-table>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" color="blue-grey" :timeout="1000">
      {{ errorText }}
    </v-snackbar>

  </div>
</template>
<script>
import { mdiPencil, mdiDelete } from '@mdi/js'
import axios from 'axios'
export default {
  data: () => ({
    icons: {
      mdiPencil,
      mdiDelete,
    },
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Blood_group', value: 'blood_group' },
      { text: 'Age', value: 'age' },
      { text: 'Phone Number', value: 'phone' },
      { text: 'Idle Date', value: 'idle_date' },
      { text: 'Active Date', value: 'active_date' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    deleteId: '',
    error: false,
    errorText:'',
    editedItem: {
      name: '',
      age: '',
      blood_group: '',
      phone: '',
    },
    defaultItem: {
      name: '',
      age: '',
      blood_group: '',
      phone: '',
    },
    rules: {
      required: value => 18 < value || 'Age must be greater then 18',
    },
    nameRules: [v => !!v || 'Required', v => (v && v.length <= 13) || 'Name must be less than 10 characters'],
    BloodGroup: ['B+', 'B-', 'A+', 'A-', 'O-', 'O+', 'AB+', 'AB-'],
    overlay: false,
    snackbar: false,
    text: ``,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Register New Donor' : 'Update Donor'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.getDonors()
  },

  methods: {
    getDonors() {
      axios
        .get('/donors',{
             headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
          })
        .then(res => {
          console.table(res.data)
          this.desserts = res.data
        })
        .catch(error => {
          console.error('error', error)
        })
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.deleteItem = item
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.overlay = true
      axios
        .delete('/donors/' + this.editedItem.id, {
           headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
        },{
          id: this.editedItem.id,
            
          })
        .then(res => {
          console.table(res.data)
          this.overlay = false
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
          this.snackbar = true
          this.text = 'Successfuly deleted Donor'
        })
        .catch(error => {
          this.overlay = false
          this.closeDelete()
          console.error('error', error)
        })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      this.overlay = true
      if(this.editedItem.age > 18){

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.overlay = true
        axios
          .put('/donors/1', {
            id: this.editedItem.id,
            name: this.editedItem.name,
            phone: this.editedItem.phone,
            blood_group: this.editedItem.blood_group,
            age: this.editedItem.age,
          },{
             headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
          })
          .then(res => {
            console.table(res.data)
            this.overlay = false
          })
          .catch(error => {
            this.overlay = false
            console.error('error', error)
          })
      } else {
        axios
          .post('/donors', {
            name: this.editedItem.name,
            phone: this.editedItem.phone,
            blood_group: this.editedItem.blood_group,
            age: this.editedItem.age,
          },{
             headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
          })
          .then(res => {
            this.getDonors()
            this.desserts.push(this.editedItem)
            // console.log(res)
            this.overlay = false
          })
          .catch(error => {
            this.overlay = false
            console.error('error', error)
          })
        }
      }else{
        this.error = true;
        this.overlay = false
        this.errorText = "Age must be greater then 18"
      }
      this.close()
    },
  },
}
</script>
