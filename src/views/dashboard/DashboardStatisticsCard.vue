<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-semibold">Statistics Card</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="data in statisticsData"
          :key="data.title"
          cols="6"
          md="3"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
               {{ resolveStatisticsIconVariation (data.title).total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline, mdiAlarmLightOutline } from '@mdi/js'
import { toRefs } from 'vue'
export default {
  props: ['Emergency'],
  setup(props) {
    const statisticsData = [
      {
        title: 'Emergency Request',
      },
      {
        title: 'Donors',
      },
      {
        title: 'Blood bags',
      },
      {
        title: 'recipients',
      },
    ]

    const resolveStatisticsIconVariation = data => {
      if (data === 'Emergency Request') return {total: props.Emergency[0], icon: mdiAlarmLightOutline, color: 'warning' }
      if (data === 'Donors') return {total: props.Emergency[1], icon: mdiAccountOutline, color: 'info' }
      if (data === 'Blood bags') return {total: '0', icon: mdiLabelOutline, color: 'success' }
      if (data === 'recipients') return {total: '0', icon: mdiAccountOutline, color: 'info' }

      return { icon: mdiAccountOutline, color: 'success' }
    }

    return {
      statisticsData,
      resolveStatisticsIconVariation,

      // icons
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiAccountOutline,
        mdiLabelOutline,
        mdiCurrencyUsd,
      },
    }
  },
}
</script>
