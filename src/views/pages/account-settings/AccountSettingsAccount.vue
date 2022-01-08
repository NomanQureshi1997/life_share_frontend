<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-card-text class="d-flex">
      <v-avatar
        
        size="80"
        class="me-6"
        color="primary"
      >
        <span class="white--text text-h5">{{avatarText}}</span>
      </v-avatar>
      <div>
     <p class="text-sm mt-3">
          {{accountDataLocale.name}}
        </p>
        <p class="text-sm ">
          {{accountDataLocale.email}}
        </p>
      </div>
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6" ref="form">
        <v-row>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.name"
              label="Name"
              :rules="[() => !!accountDataLocale.name || 'This field is required',
              () => (accountDataLocale.name).length >= 3 || 'Password must be 3 characters']"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.email"
              readonly
              label="E-mail"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              @click="$refs.form.validate() ? $emit('update',accountDataLocale.name ) : $refs.form.validate(true)"
            >
              Save changes
            </v-btn>
           
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const status = ['Active', 'Inactive', 'Pending', 'Closed']

    const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))

    const resetForm = () => {
      accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
    }

    return {
      status,
      accountDataLocale,
      resetForm,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
  computed:{
    avatarText(){
      let arr = (this.accountData.name).split(' ')
      console.log(arr.length)
      if(arr.length>1){
         console.log(arr)
        return arr[0].charAt(0) + arr[1].charAt(0)
      }else{
        return arr[0].charAt(0)
      }
    }
  },
}
</script>
<style scoped>
.v-application p {
    margin-bottom: 5px;
}
</style>