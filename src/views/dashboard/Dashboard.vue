<template>
  <div>
    <v-row>
      <v-col cols="12">
         <date-picker style="margin-top: 0px;" @getData="callApis($event)"></date-picker>
      </v-col>
      <v-col cols="3" sm="3">
        <emergancy-statistics-card-vertical
          :color="Request.color"
          :icon="Request.icon"
          :statistics="emergencyCount"
          :stat-title="Request.statTitle"
        ></emergancy-statistics-card-vertical>
      </v-col>
      <v-col cols="3" sm="3">
        <emergancy-statistics-card-vertical
          :color="totalDonors.color"
          :icon="totalDonors.icon"
          :statistics="donorsCount"
          :stat-title="totalDonors.statTitle"
        ></emergancy-statistics-card-vertical>
      </v-col>
      <v-col cols="3" sm="3">
        <emergancy-statistics-card-vertical
          :color="bloodBags.color"
          :icon="bloodBags.icon"
          :statistics="bloodBags.statistics"
          :stat-title="bloodBags.statTitle"
        ></emergancy-statistics-card-vertical>
      </v-col>
      <v-col cols="3" sm="3">
        <emergancy-statistics-card-vertical
          :color="bloodRequest.color"
          :icon="bloodRequest.icon"
          :statistics="bloodCount"
          :stat-title="bloodRequest.statTitle"
        ></emergancy-statistics-card-vertical>
      </v-col>
      <v-col cols="4" md="4">
        <EmergencyPanel :request="emergencyRequests" :title="'Emergency Request'"></EmergencyPanel>
      </v-col>
      <v-col cols="4" md="4">
        <BloodRequest :request="bloodRequests" :title="'Blood Request'"/>
      </v-col>
      <v-col cols="4" md="4">
        <request-chart></request-chart>
      </v-col>
      <v-col cols="12" md="12">
        <!-- <growing-org-chart></growing-org-chart> -->
       
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EmergancyStatisticsCardVertical from '@/components/statistics-card/EmergancyStatisticsCardVertical.vue'
import { mdiAccountOutline, mdiBloodBag, mdiAlarmLightOutline } from '@mdi/js'

import EmergencyPanel from './Emergency-Panel.vue'
import DatePicker from '@/components/DatePicker.vue'
import GrowingOrgChart from './GrowingOrgChart.vue'
import RequestChart from './RequestChart.vue'
import BloodRequest from './BloodRequest.vue'


export default {
  components: {
    EmergancyStatisticsCardVertical,
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
      chartOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
          },
        ],
      },
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
      statistics: 862,
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
    // this.request()
    // this.interval = setInterval(() => {
    this.EmergencyRequests()
    this.BloodRequests()
    //   this.input = null
    // }, 10000)
  },
  methods: {
    EmergencyRequests() {
      this.$http
        .get('/get-emergency-request', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
          },
        })
        .then(res => {
          this.emergencyRequests = res.data.emergencyRequest
          this.donorsCount = res.data.donorCount
          this.emergencyCount = res.data.emergencyRequest.length
        })
        .catch(error => {
          console.error('error', error)
        })
    },
    BloodRequests() {
      this.$http
        .get('/get-blood-request', {
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
      console.log(event)
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
