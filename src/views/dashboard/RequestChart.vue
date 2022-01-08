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
  data() {
    return {
      barChart: {
        chart: {
          type: 'column',
        },
        title: {
          text: '',
        },
        subtitle: {
          text:
            '',
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
              format: '{point.y:.1f}%',
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
        },

        series: [
          {
            name: 'Browsers',
            colorByPoint: true,
            data: [
              {
                name: 'Emergency Request',
                y: 62.74,
                drilldown: 'Chrome',
              },
              {
                name: 'Blood Request',
                y: 10.57,
                drilldown: 'Firefox',
              },
            ],
          },
        ],
        
      },
    }
  },
}
</script>
<style scoped>
/* ::v-deep .highcharts-root{
  width: 322px !important;
} */
</style>