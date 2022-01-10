<template>
  <div>
    <v-row>
      <v-col cols="12">
         <date-picker style="margin-top: 0px;" @getData="callApis($event)"></date-picker>
      </v-col>
      <v-col cols="3" sm="3">
        <Cards
          :color="Request.color"
          :icon="Request.icon"
          :statistics="emergencyCount"
          :stat-title="Request.statTitle"
        ></Cards>
      </v-col>
      <v-col cols="3" sm="3">
        <Cards
          :color="totalDonors.color"
          :icon="totalDonors.icon"
          :statistics="donorsCount"
          :stat-title="totalDonors.statTitle"
        ></Cards>
      </v-col>
      <v-col cols="3" sm="3">
        <Cards
          :color="bloodBags.color"
          :icon="bloodBags.icon"
          :statistics="bags"
          :stat-title="bloodBags.statTitle"
        ></Cards>
      </v-col>
      <v-col cols="3" sm="3">
        <Cards
          :color="bloodRequest.color"
          :icon="bloodRequest.icon"
          :statistics="bloodCount"
          :stat-title="bloodRequest.statTitle"
        ></Cards>
      </v-col>
      <v-col cols="4" md="4">
        <EmergencyPanel :request="emergencyRequests" :title="'Emergency Request'"></EmergencyPanel>
      </v-col>
      <v-col cols="4" md="4">
        <BloodRequest :request="bloodRequests" :title="'Blood Request'"/>
      </v-col>
      <v-col cols="4" md="4">
        <request-chart ref="barChart" :emergencyCount="emergencyCount" :bloodCount="bloodCount"></request-chart>
      </v-col>
      <v-col cols="12" md="12">
        <!-- <growing-org-chart></growing-org-chart> -->
       
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Cards from '@/components/Dashboard-Cards/DashboardCards.vue'
import { mdiAccountOutline, mdiBloodBag, mdiAlarmLightOutline } from '@mdi/js'

import EmergencyPanel from './Emergency-Panel.vue'
import DatePicker from '@/components/DatePicker.vue'
import GrowingOrgChart from './GrowingOrgChart.vue'
import RequestChart from './RequestChart.vue'
import BloodRequest from './BloodRequest.vue'


export default {
  components: {
    Cards,
    EmergencyPanel,
    DatePicker,
    RequestChart,
    BloodRequest,
  },
  data() {
    return {
      emergencyCount: 0,
      bloodCount: 0,
      emergencyRequests: [],
      bloodRequests: [],
      donorsCount: 0,
      bags: 0,
    }
  },
  setup() {
    const Request = {
      statTitle: 'Emergency Request',
      icon: mdiAlarmLightOutline,
      color: 'warning',
    }

    const totalDonors = {
      statTitle: 'Donors',
      icon: mdiAccountOutline,
      color: 'success',
      statistics: 78,
    }

    const bloodBags = {
      statTitle: 'Blood bags',
      icon: mdiBloodBag,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: 0,
    }

    const bloodRequest = {
      statTitle: 'Blood Request',
      icon: mdiAlarmLightOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: 15,
    }
    return {
      Request,
      totalDonors,
      bloodBags,
      bloodRequest,
    }
  },
  mounted() {
    // this.$refs.barChart.setSeries(this.emergencyCount, this.bloodCount);
    // this.request()
    // this.interval = setInterval(() => {
    // this.EmergencyRequests()
    // this.BloodRequests()
    //   this.input = null
    // }, 10000)
  },
  methods: {
    EmergencyRequests(date) {
      this.$http
        .get('/get-emergency-request', {
          params:{
            date: date
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
        })
        .then(res => {
          this.emergencyRequests = res.data.emergencyRequest
          this.donorsCount = res.data.donorCount
          this.emergencyCount = res.data.emergencyRequest.length
          this.bags = res.data.bloodBags
        })
        .catch(error => {
          console.error('error', error)
        })
    },
    BloodRequests(date) {
      this.$http
        .get('/get-blood-request', {
          params:{
            date: date
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
        })
        .then(res => {
          this.bloodRequests = res.data
          console.log(res)
          this.bloodCount = res.data.length
        })
        .catch(error => {
          console.error('error', error)
        })
    },
    callApis(event) {
      this.EmergencyRequests(event)
      this.BloodRequests(event)
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
    console.log('beforeDestroy')
  },
}
</script>
<style scoped>
.v-application .justify-center {
  justify-content: right !important;
}
</style>
