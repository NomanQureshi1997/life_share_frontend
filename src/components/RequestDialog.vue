<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card style="width: 1000px;">
        <v-hover v-slot="{ hover }">
          <v-card-title :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
            <v-toolbar class="transition-swing" style=" border-radius: 6px;" color="primary">
              <v-toolbar-title style="color: #ffff">{{title}}</v-toolbar-title>
            </v-toolbar>
          </v-card-title>
        </v-hover>
        <v-card-text>
          <v-row>
            <v-col cols="4" v-for="item in render" :key="item.id">
              <v-text-field v-model="item.value" :label="item.title" filled shaped readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn @click="dialog = false" color="primary">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      render: [],
      dialog: false
    }
  },
  methods:{
    renderData(item){
      this.render = [
        {
          title: 'patient Name',
          value: item.patient,
        },
        {
          title: 'Blood Group',
          value: item.group,
        },
        {
          title: 'City',
          value: item.city,
        },
        {
          title: 'State',
          value: item.state,
        },
        {
          title: 'Contact Person',
          value: item.contact_person,
        },
        {
          title: 'Patient Contact',
          value: item.contact_phone,
        },
      ]
    }
  }
}
</script>
<style scoped>
::v-deep .v-dialog {
  width: auto !important;
}
</style>
