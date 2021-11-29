<template>
  <v-card height="100vh">
    <v-card-title class="align-start">
      <span>Emergency</span>

      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="timeline"
      :items-per-page="-1"
      class="elevation-1 example"
      :hide-default-header="true"
      :hide-default-footer="true"
      height="95vh"
    ></v-data-table>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiChevronUp, mdiChevronDown } from '@mdi/js'
import axios from 'axios'

export default {
  data() {
    return {
      headers: [
        {
          text: 'message',
          align: 'start',
          sortable: false,
          value: 'message',
        },
      ],
      items: [],
      icons: {
        mdiDotsVertical,
        mdiChevronUp,
        mdiChevronDown,
      },
      interval: null,
    }
  },
  computed: {
    timeline() {
      return this.items.slice().reverse()
    },
  },
  mounted() {
    this.request()
    this.interval = setInterval(() => {
      this.request()
      this.input = null
    }, 10000)
  },
  methods: {
    request() {
      this.$http
        .get('/get-emergency-request', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
        })
        .then(res => {
          this.items = res.data
          console.log(res)
          this.length = res.data.length
          this.$emit('emergency', [res.data.length])
          // this.$emit('donorCount' , res.data.donorCount)
        })
        .catch(error => {
          console.error('error', error)
        })
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
    console.log('beforeDestroy')
  },
}
</script>
<style scoped>
.example::-webkit-scrollbar {
  overflow-y: hidden;
  display: none;
}
</style>
