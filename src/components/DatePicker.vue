<template>
  <div>
    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="picker"
          outlined
          persistent-hint
          readonly
          v-bind="attrs"
          v-on="on"
          no-title
        ></v-text-field>
      </template>
      <v-date-picker v-model="picker"  no-title scrollable :max="picker" @change=";(modal = false), $emit('getData', picker)">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false">
          Cancel
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu1: false,
      modal: false,
    }
  },
}
</script>
<style scoped>
::v-deep.v-picker__body {
  width: 100% !important;
}
::v-deep .v-text-field.v-text-field--enclosed .v-text-field__details {
  /* padding-top: 0px; */
  margin-bottom: 0px !important;
}
</style>
