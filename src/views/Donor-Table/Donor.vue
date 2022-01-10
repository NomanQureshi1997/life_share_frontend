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
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="4" v-for="item in render" :key="item.key">
                        <v-text-field
                          v-if="item.dropDown == false"
                          v-model="item.value"
                          :rules="item.rule"
                          outlined
                          :label="item.title"
                        ></v-text-field>
                        <v-select
                          v-if="item.dropDown == true"
                          v-model="item.value"
                          :items="item.default"
                          outlined
                          :rules="item.rule"
                          append-icon="mdi-arrow-down-drop-circle textColor--text"
                          :label="item.title"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-form>
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
              <v-card-title class="text center">Are you sure you want to delete this donor?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" :loading="loader" text @click="deleteItemConfirm">OK</v-btn>
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
      { text: 'Blood_group', value: 'blood' },
      { text: 'Age', value: 'age' },
      { text: 'Phone Number', value: 'phone' },
      { text: 'Gender', value: 'gender' },
      { text: 'City', value: 'city' },
      { text: 'Address', value: 'address' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    deleteId: '',
    error: false,
    errorText: '',
    editedItem: {
      name: '',
      age: '',
      blood: '',
      weight: '',
      gender: '',
      address: '',
      city: '',
      email: '',
      phone: '',
    },
    defaultItem: {
      name: '',
      age: '',
      blood: '',
      weight: '',
      gender: '',
      address: '',
      city: '',
      email: '',
      phone: '',
    },

    overlay: false,
    snackbar: false,
    text: ``,
    render: [
      {
        key: 0,
        value: '',
        title: 'Name*',
        rule: [
          value => !!value || 'This field is required',
          value => /^[a-zA-Z]+$/.test(value) || 'Field should only contain character',
          value =>
            (value.length >= 2 && value.length <= 26) ||
            'Name should be greater then 2 character and less then 26 character ',
        ],
        columName: 'name',
        dropDown: false,
      },
      {
        key: 1,
        value: '',
        title: 'Age*',
        rule: [
          value => !!value || 'This field is required',
          value => (!!value && value >= 18 && value <= 65) || 'Age must be greater then 18 and less then 65',
        ],
        columName: 'age',
        dropDown: false,
      },
      {
        key: 2,
        value: '',
        title: 'Weight*',
        rule: [
          value => !!value || 'This field is required',
          value => /^[0-9]+$/.test(value) || 'Field should only contain integers',
          value => (!!value && value >= 50 && value <= 120) || 'Weight must be greater then 50 kg and less then 120 Kg',
        ],
        columName: 'weight',
        dropDown: false,
      },
      {
        key: 3,
        default: ['B+', 'B-', 'A+', 'A-', 'O-', 'O+', 'AB+', 'AB-'],
        value: '',
        title: 'Blood Group*',
        rule: [value => !!value || 'This field is required'],
        columName: 'blood',
        dropDown: true,
      },
      {
        key: 4,
        default: ['Male', 'Female'],
        value: '',
        title: 'Gender*',
        rule: [value => !!value || 'This field is required'],
        columName: 'gender',
        dropDown: true,
      },
      {
        key: 5,
        value: '',
        title: 'Address',
        columName: 'address',
        rule: [value => /^[a-zA-Z0-9\s/]+$/.test(value) || 'Field should not contain special character',
        value => (value.length < 46) || 'Addess must be less then 46 character'],
        dropDown: false,
      },
      {
        key: 6,
        value: '',
        title: 'City*',
        rule: [
          value => !!value || 'This field is required',
          value => /^[a-zA-Z]+$/.test(value) || 'Field should only contain character',
          value =>
            (!!value && value.length >= 2 && value.length <= 12) ||
            'Field should be greater then 2 character and less then 12 character ',
        ],
        columName: 'city',
        dropDown: false,
      },
      {
        key: 7,
        value: '',
        title: 'Phone*',
        rule: [
          value => !!value || 'This field is required',
          value => (!!value && value.length >= 11 && value.length <= 13) || 'Phone no is incorrect',
        ],
        columName: 'phone',
        dropDown: false,
      },
      {
        key: 8,
        value: '',
        title: 'Email',
        rule: [v => /.+@.+/.test(v) || 'Invalid Email address'],
        columName: 'email',
        dropDown: false,
      },
    ],
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
        .get('/donors', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the auth token
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
      this.render[0].value = item.name
      this.render[1].value = item.age
      this.render[2].value = item.weight
      this.render[3].value = item.blood
      this.render[4].value = item.gender
      this.render[5].value = item.address
      this.render[6].value = item.city
      this.render[7].value = item.phone
      this.render[8].value = item.email
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      console.log(item)

      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.loader = this.overlay = true
      axios
        .delete(
          '/donors/' + this.editedItem.id,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
            },
          },
          {
            id: this.editedItem.id,
          },
        )
        .then(res => {
          console.table(res.data)
          this.loader = this.overlay = false
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
          this.snackbar = true
          this.text = 'Successfuly deleted Donor'
        })
        .catch(error => {
          this.loader = this.overlay = false
          this.closeDelete()
          console.error('error', error)
        })
    },

    close() {
      this.dialog = false
      if(this.editedIndex == -1){
        this.render.forEach(item => {
          item.value = ''
        })
      }
      this.editedIndex = -1
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.$refs.form.validate()) {
        this.overlay = true
        if (this.editedIndex > -1) {
          
          axios
            .put(
              '/donors/1',
              {
                name: this.render[0].value,
                age: this.render[1].value,
                weight: this.render[2].value,
                blood: this.render[3].value,
                gender: this.render[4].value,
                address: this.render[5].value,
                city: this.render[6].value,
                phone: this.render[7].value,
                email: this.render[8].value,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
                },
              },
            )
            .then(res => {
              this.getDonors()
              this.overlay = false
            })
            .catch(error => {
              this.overlay = false
              console.error('error', error)
            })
        } else {
          axios
            .post(
              '/donors',
              {
                name: this.render[0].value,
                age: this.render[1].value,
                weight: this.render[2].value,
                blood: this.render[3].value,
                gender: this.render[4].value,
                address: this.render[5].value,
                city: this.render[6].value,
                phone: this.render[7].value,
                email: this.render[8].value,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
                },
              },
            )
            .then(res => {
              this.getDonors()
              this.desserts.push(this.editedItem)
              this.overlay = false
            })
            .catch(error => {
              this.overlay = false
              console.error('error', error)
            })
        }
        this.close()
      }
    },
  },
}
</script>
