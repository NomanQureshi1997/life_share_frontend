<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
      <v-card-title class="align-start">
        <v-avatar :color="color" size="38" class="elevation-3">
          <v-icon size="24" color="white" class="rounded-0">
            {{ icon }}
          </v-icon>
        </v-avatar>
      </v-card-title>

      <v-card-text class="text-no-wrap text--primary ">
        <p class="font-weight-semibold text-sm ">
          {{ statTitle }}
        </p>

        <div class="d-flex align-end flex-wrap">
          <span class="font-weight-semibold text-2xl">{{ statistics }}</span>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    statTitle: { type: String, default: '' },
    icon: { type: String, default: '' },
    color: { type: String, default: '' },
    statistics: { type: Number, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.percentage {
  top: -8px;
  position: relative;
}

</style>
