<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-slide-x-transition>
              <v-row>
                <v-col cols="3">
                  <v-icon dark color="primary" size="40">
                    {{ icons.mdiHandHeart }}
                  </v-icon>
                </v-col>
                <v-col cols="9">
                  <h3 class="text--primary pt-3 pl-2">
                    Life Share
                  </h3>
                </v-col>
              </v-row>
            </v-slide-x-transition>
          </router-link>
        </v-card-title>

        <v-card-text class="mt-5">
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder=""
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <v-btn block color="primary" class="mt-6" :loading="loader" @click="signIn()">
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="#FF0000" top rounded="pill" small right>
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline, mdiHandHeart } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from 'axios'

export default {
  data() {
    return {
      snackbar: false,
      text: '',
      timeout: 2000,
      loader: false,
    }
  },
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')

    return {
      isPasswordVisible,
      email,
      password,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiHandHeart,
      },
    }
  },
  methods: {
    signIn() {
      this.loader = true
      axios
        .post('/signin', {
          email: this.email,
          password: this.password,
        })
        .then(res => {
          console.log(res)
          this.$store.commit('CheckAuth', true)
          localStorage.setItem('CurrentUserEmail', this.email)
          localStorage.setItem('userName', res.data.userInfo.name)
          localStorage.setItem('token', res.data.token)
          this.$router.push('/dashboard')
          this.loader = false
        })
        .catch(error => {
          this.loader = false
          console.error('error', error)
          this.snackbar = true
          this.text = 'Email or Password is incorrect'
        })
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
