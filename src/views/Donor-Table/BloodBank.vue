<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" height="400">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Blood Bank </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Blood
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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.donor_name"
                          outlined
                          :rules="[
                            () => !!editedItem.donor_name || 'This field is required',
                            () => /^[a-zA-Z]+$/.test(editedItem.donor_name) || 'Field should only contain character',
                            () =>
                              (!!editedItem.donor_name &&
                                editedItem.donor_name.length >= 2 &&
                                editedItem.donor_name.length <= 26) ||
                              'Name should be greater then 2 character and less then 26 character ',
                          ]"
                          persistent-hint
                          label="Donor Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.donor_age"
                          outlined
                          :rules="[
                            () => !!editedItem.donor_age || 'This field is required',
                            () =>
                              (!!editedItem.donor_age && editedItem.donor_age >= 18 && editedItem.donor_age <= 65) ||
                              'Age must be greater then 18 and less then 65',
                          ]"
                          persistent-hint
                          label="Age"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedItem.blood_group"
                          outlined
                          :items="BloodGroup"
                          :rules="[() => !!editedItem.blood_group || 'This field is required']"
                          append-icon="mdi-arrow-down-drop-circle textColor--text"
                          label="BloodGroup"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          outlined
                          v-model="editedItem.phone_no"
                          :rules="[
                            () => !!editedItem.phone_no || 'This field is required',

                            () =>
                              (!!editedItem.phone_no &&
                                editedItem.phone_no.length >= 11 &&
                                editedItem.phone_no.length <= 12) ||
                              'Phone no is incorrect',
                          ]"
                          label="Phone_Number"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          outlined
                          v-model="editedItem.donor_weight"
                          :rules="[
                            () => !!editedItem.donor_weight || 'This field is required',
                            () => /^[0-9]+$/.test(editedItem.donor_weight) || 'Field should only contain integers',
                            () =>
                              (!!editedItem.donor_weight &&
                                editedItem.donor_weight >= 50 &&
                                editedItem.donor_weight <= 120) ||
                              'Weight must be greater then 50 kg and less then 120 Kg',
                          ]"
                          type="number"
                          label="Weight"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          outlined
                          v-model="editedItem.bag_id"
                          :rules="[
                            () => !!editedItem.bag_id || 'This field is required',
                            () =>
                              /^[a-zA-Z0-9]+$/.test(editedItem.bag_id) || 'Field should not include special character',
                          ]"
                          label="Bag Number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox v-model="editedItem.is_accpeted" label="Accpeted"></v-checkbox>
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
        <v-icon small v-if="item.is_accpeted == 0"  class="mr-2" @click="editItem(item)">
          {{ icons.mdiPencil }}
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          {{ icons.mdiDelete }}
        </v-icon>
      </template>
      <template v-slot:[`item.Status`]="{ item }">
        <span v-if="item.is_accpeted == 1" style="color: forestgreen;">Accpeted</span>
        <span v-if="item.is_accpeted == 0" style="color: orange;">Pending</span>
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
        value: 'donor_name',
      },
      { text: 'Blood_group', value: 'blood_group' },
      { text: 'Age', value: 'donor_age' },
      { text: 'Phone Number', value: 'phone_no' },
      { text: 'Bag Number', value: 'bag_id' },
      { text: 'weight', value: 'donor_weight' },
      { text: 'Status', value: 'Status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    deleteId: '',
    error: false,
    errorText: '',
    editedItem: {
      donor_name: '',
      donor_age: '',
      donor_weight: '',
      phone_no: '',
      blood_group: '',
      is_accpeted: false,
      bag_id: '',
    },
    defaultItem: {
      donor_name: '',
      donor_age: '',
      donor_weight: '',
      phone_no: '',
      blood_group: '',
      is_accpeted: false,
      bag_id: '',
    },
    rules: {
      required: value => 18 < value || 65 > value || 'Age must be greater then 18 and less then 65',
    },
    nameRules: [
      v => !!v || 'This field is required',
      v => (!!v && v.length <= 13) || 'Name must be less than 10 characters',
    ],
    BloodGroup: ['B+', 'B-', 'A+', 'A-', 'O-', 'O+', 'AB+', 'AB-'],
    overlay: false,
    snackbar: false,
    text: ``,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Register Blood' : 'Update blood'
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
        .get('/get-blood-bag', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
        })
        .then(res => {
          console.log(res.data)
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
        .get('/delete-blood-bag', {
          params: {
            id: this.editedItem.id,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
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
      // console.log(this.$refs.form.validate())
      // return
      if (this.$refs.form.validate()) {
        this.overlay = true
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.overlay = true
          axios
            .post(
              '/update-blood-bag',
              {
                id: this.editedItem.id,
                donor_name: this.editedItem.donor_name,
                donor_age: this.editedItem.donor_age,
                donor_weight: this.editedItem.donor_weight,
                phone_no: this.editedItem.phone_no,
                blood_group: this.editedItem.blood_group,
                is_accpeted: this.editedItem.is_accpeted,
                bag_id: this.editedItem.bag_id,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
                },
              },
            )
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
            .post(
              '/register-blood-bag',
              {
                donor_name: this.editedItem.donor_name,
                donor_age: this.editedItem.donor_age,
                donor_weight: this.editedItem.donor_weight,
                phone_no: this.editedItem.phone_no,
                blood_group: this.editedItem.blood_group,
                is_accpeted: this.editedItem.is_accpeted == true ? 1 : 0,
                bag_id: this.editedItem.bag_id,
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
              // console.log(res)
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
