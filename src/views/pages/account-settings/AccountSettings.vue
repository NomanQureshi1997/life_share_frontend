<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.icon">
        <v-icon size="20" class="me-3">
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-settings-account
          :account-data="accountSettingData.account"
          @update="update($event)"
        ></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-security></account-settings-security>
      </v-tab-item>
    </v-tabs-items>
    <snack-bar
      :success="snackBarSuccess"
      :successMesg="snackBarSuccessM"
      :error="snackBarError"
      :errorMesg="snackBarErrorM"
    ></snack-bar>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsSecurity from './AccountSettingsSecurity.vue'
import axios from 'axios'
import SnackBar from '@/components/SnackBar.vue'
export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsSecurity,
    SnackBar,
  },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Account', icon: mdiAccountOutline },
      { title: 'Security', icon: mdiLockOpenOutline },
      // { title: 'Info', icon: mdiInformationOutline },
    ]

    // account settings data
    const accountSettingData = {
      account: {
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('CurrentUserEmail'),
      },
      information: {
        bio: '',
        birthday: '',
        phone: '',
        website: '',
        country: '',
        languages: ['', ''],
        gender: '',
      },
    }

    return {
      tab,
      tabs,
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
  data() {
    return {
      snackBarSuccess: {
        key: false,
      },
      snackBarError: {
        key: false,
      },
      snackBarSuccessM: {
        key: '',
      },
      snackBarErrorM: {
        key: '',
      },
    }
  },
  methods: {
    update(userName) {
      axios
        .post(
          '/update-user-profile',
          {
            name: userName,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
            },
          },
        )
        .then(res => {
          console.log(res.data)
          localStorage.setItem('userName', userName)
          this.snackBarSuccess.key = true
          this.snackBarSuccessM.key = 'Updated successfuly'
        })
        .catch(error => {
          console.error('error', error)
          this.snackBarError.key = true
          this.snackBarErrorM.key = error.response.data.errors.name[0]
        })
    },
  },
}
</script>
