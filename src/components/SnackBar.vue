<template>
  <div>
    <v-snackbar v-model="success.key">
      {{ successMesg.key }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="success.key = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="error.key" color="blue-grey" :timeout="2000">
      {{ errorMesg.key }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    success: {
      type: Object,
      default: false,
    },
    successMesg: {
      type: Object,
      default: '',
    },
    error: {
      type: Object,
      default: false,
    },
    errorMesg: {
      type: Object,
      default: '',
    },
  },
}
</script>
