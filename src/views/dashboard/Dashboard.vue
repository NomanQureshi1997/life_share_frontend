<template>
  <v-row>
    <v-col cols="12" md="4">
      <dashboard-card-sales-by-countries @emergency="emergency"></dashboard-card-sales-by-countries>
    </v-col>
    <v-col cols="12" md="8">
      <v-row>
        <v-col cols="12">
          <dashboard-statistics-card :Emergency="emergencyRequest"></dashboard-statistics-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" sm="6">
          <v-card class="mx-auto" outlined>
            <v-carousel hide-delimiters>
              <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <!-- <v-col cols="12" md="6" sm="6">
          <dashboard-card-total-earning></dashboard-card-total-earning>
        </v-col> -->
        <!-- <v-col cols="12" md="6">
          <v-row class="match-height">
            <v-col cols="12" sm="6">
              <statistics-card-vertical
                :change="totalProfit.change"
                :color="totalProfit.color"
                :icon="totalProfit.icon"
                :statistics="totalProfit.statistics"
                :stat-title="totalProfit.statTitle"
                :subtitle="totalProfit.subtitle"
              ></statistics-card-vertical>
            </v-col>
            <v-col cols="12" sm="6">
              <statistics-card-vertical
                :change="totalSales.change"
                :color="totalSales.color"
                :icon="totalSales.icon"
                :statistics="totalSales.statistics"
                :stat-title="totalSales.statTitle"
                :subtitle="totalSales.subtitle"
              ></statistics-card-vertical>
            </v-col>
            <v-col cols="12" sm="6">
              <statistics-card-vertical
                :change="newProject.change"
                :color="newProject.color"
                :icon="newProject.icon"
                :statistics="newProject.statistics"
                :stat-title="newProject.statTitle"
                :subtitle="newProject.subtitle"
              ></statistics-card-vertical>
            </v-col>

            <v-col cols="12" sm="6">
              <statistics-card-vertical
                :change="salesQueries.change"
                :color="salesQueries.color"
                :icon="salesQueries.icon"
                :statistics="salesQueries.statistics"
                :stat-title="salesQueries.statTitle"
                :subtitle="salesQueries.subtitle"
              ></statistics-card-vertical>
            </v-col> -->
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'
import DashboardCardSalesByCountries from './DashboardCardSalesByCountries.vue'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import DashboardDatatable from './DashboardDatatable.vue'

export default {
  components: {
    StatisticsCardVertical,
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardCardTotalEarning,
    DashboardCardSalesByCountries,
    DashboardWeeklyOverview,
    DashboardDatatable,
  },
  data() {
    return {
      emergencyRequest: 0,
      items: [
        {
          src:
            'https://images.thequint.com/thequint%2F2015-08%2F31e98f8a-7aab-4978-9f9d-fb45539773b2%2FUntitled%20Infographic%20(54).jpeg?rect=0%2C0%2C1600%2C900',
        },
        {
          src:
            'https://newspakistanenglish.s3.ap-south-1.amazonaws.com/wp-content/uploads/2019/06/World-Blood-Donor-Day.png',
        },
        {
          src: 'https://www.lnh.edu.pk/Bluetheme/images/services-img/bloodbank.JPG',
        },
        {
          src: 'https://www.alliedmarketresearch.com/assets/sampleimages/blood-bank-market-2020-2027-1588761176.jpeg',
        },
      ],
    }
  },
  methods: {
    emergency(e) {
      this.emergencyRequest = e
    },
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },
}
</script>
