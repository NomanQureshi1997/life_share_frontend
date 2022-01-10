<template>
  <v-card style="margin-top: 16px">
    <v-card-title style="height: 1px ">
      <v-toolbar class="transition-swing" style="bottom: 47px; border-radius: 6px;" color="primary">
        <v-toolbar-title style="color: #ffff">Request Chart</v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <highcharts :options="barChart" ref="chart"></highcharts>
  </v-card>
</template>
<script>
export default {
  props: {
    emergencyCount: {
      type: Number,
    },
    bloodCount: {
      type: Number,
    },
  },
  watch:{
    emergencyCount(){
      this.setSeries()
    },
    bloodCount(){
      this.setSeries()
    },
    '$vuetify.theme.dark'(){
     this.barChart.chart.backgroundColor = this.$vuetify.theme.dark ? '#312D4B' : '#FFFFFF'
    }
  },
  data() {
    return {
      barChart: {
        chart: {
          type: 'column',
          backgroundColor:'#FFFFFF'
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          title: {
            text: '',
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
        },

        series: [
          {
          name: 'Browsers',
          colorByPoint: true,
          data: [
            {
              name: 'Emergency Request',
              y: 0,
            },
            {
              name: 'Blood Request',
              y: 0,
            },
          ],
        },
        ],
        colors: ['#8B0000', '#0d233a']
      },
    }
  },
  methods:{
    setSeries(){
      this.barChart.series[0].data[0].y = this.emergencyCount;
      this.barChart.series[0].data[1].y = this.bloodCount
    }

  },
  mounted() {
    this.setSeries();
  },
}
</script>
<style scoped>
::v-deep .highcharts-root{
  width: -webkit-fill-available !important;
}
::v-deep .highcharts-container{
  width: inherit !important;
}
</style>

