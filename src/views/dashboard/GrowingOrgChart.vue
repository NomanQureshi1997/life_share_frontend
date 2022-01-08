<template>
  <section>
    <v-card :loading="loadingGraph">
      <highcharts :options="areaSplineChart" ref="chart"></highcharts>
    </v-card>
  </section>
</template>
<script>
import axios from 'axios'
import Highcharts, { color } from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
highchartsMore(Highcharts)
export default {
  components: {},
  data() {
    return {
      modal: false,
      loader: false,
      loading: false,
      loadingGraph: false,
      currentMonth: '',
      previousMonth: '',
      month: '',
      areaSplineChart: {
        chart: {
          type: 'areaspline',
        },
        // title: {

        //   fontSize: "12px",
        //   align: "left",
        // },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,

          backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: ['Donors', 'Blood Bags'],
          
        },
        yAxis: {
        
        },
        tooltip: {
          shared: true,
          valueSuffix: ' volume',
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.5,
          },
        },
        colors: ['#00FF00', '#EFEDFD'],
        series: [
          {
            name: 'Donors',
            data: [3, 4, 3, 5, 4, 10, 12],
          },
          {
            name: 'Blood Bags',
            data: [1, 3, 4, 3, 3, 5, 4],
          },
        ],
      },
    }
  },
}
</script>
<style scoped>
#container {
  height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}

.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}

.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>