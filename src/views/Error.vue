<template>
  <div>
    <div class="page-title text-center  " style="top:50vh">
      <h2 class="text-2xl font-weight-semibold text--primary d-flex align-center justify-center " style="top:50%" >
        <span class="me-2">Page Not Found</span>
        <v-icon color="warning">
          {{ icons.mdiAlert }}
        </v-icon>
      </h2>
      <p class="text-sm">
        we couldn't find the page you are looking for
      </p>
      <v-btn
        color="primary"
        to="/"
        class="mb-4"
      >
        Back to home
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiAlert } from '@mdi/js'

export default {
  setup() {
    return {
      icons: {
        mdiAlert,
      },
    }
  },
}

