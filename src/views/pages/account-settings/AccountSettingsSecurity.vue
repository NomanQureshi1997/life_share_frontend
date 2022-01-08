<template>
  <v-card flat class="mt-5">
    <v-form ref="form">
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col cols="12" sm="8" md="6" class="py-2">
              <!-- current password -->
              <v-text-field
                v-model="currentPassword"
                :rules="[() => !!currentPassword || 'This field is required',
                () => currentPassword.length >= 8 || 'Password must be 8 characters' ]"
                :type="isCurrentPasswordVisible ? 'text' : 'password'"
                :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                label="Current Password"
                outlined
                dense
                @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
              ></v-text-field>

              <!-- new password -->
              <v-text-field
                v-model="newPassword"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :rules="[() => !!newPassword || 'This field is required',
                 () => newPassword.length >= 8 || 'Password must be 8 characters']"
                :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                label="New Password"
                outlined
                dense
                hint="Make sure it's at least 8 characters."
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="cNewPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                label="Confirm New Password"
                :rules="[() => cNewPassword == newPassword|| 'Password does not match',
                () => !!cNewPassword || 'This field is required',
                () => cNewPassword.length >= 8 || 'Password must be 8 characters']"
                outlined
                dense
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">
        <v-card-text>
          <v-btn color="primary" class="me-3 mt-3" @click="update()">
            Save changes
          </v-btn>
        </v-card-text>
      </div>
    </v-form>
    <snack-bar
      :success="snackBarSuccess"
      :successMesg="snackBarSuccessM"
      :error="snackBarError"
      :errorMesg="snackBarErrorM"
    ></snack-bar>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from 'axios'
import SnackBar from '@/components/SnackBar.vue'
export default {
   components: {
    SnackBar,
  },
  setup() {
    const isCurrentPasswordVisible = ref(false)
    const isNewPasswordVisible = ref(false)
    const isCPasswordVisible = ref(false)

    return {
      isCurrentPasswordVisible,
      isNewPasswordVisible,
      isCPasswordVisible,
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
    }
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      cNewPassword: '',
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
      if(this.$refs.form.validate()){
      axios
        .post(
          '/password-update',
          {
            currentPassword: this.currentPassword,
            password: this.newPassword,
            password_confirmation: this.cNewPassword 
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
          console.error('error', error.response.data.errors)
          this.snackBarError.key = true
          this.snackBarErrorM.key = error.response.data
        })
      }else{
        this.$refs.form.validate(true)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
