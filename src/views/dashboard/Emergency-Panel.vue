<template>
  <div id="inspire" style="margin-top: 16px">
    <v-card class="" max-width="400" height="400">
      <v-card-title style="height: 1px ">
        <v-toolbar class="transition-swing" style="bottom: 47px; border-radius: 6px;" color="primary">
          <v-toolbar-title style="color: #ffff">{{ title }}</v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card
        style="overflow: scroll; 
              height: inherit;
              border-radius: 6px;"
      >
        <v-list two-line >
          <v-list-item-group v-model="selected" >
            <template v-for="(item, index) in request">
              <v-list-item :key="item.id" @click="renderData(item)">
                <v-list-item-content>
                  <v-list-item-title v-text="item.patient"></v-list-item-title>

                  <v-list-item-subtitle class="text--primary">Required blood {{item.group}}</v-list-item-subtitle>

                  <v-list-item-subtitle v-text="item.city"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text>{{ item.date }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>

              <v-divider v-if="index < request.length - 1" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-card>
    <request-dialog :title="title" ref="dialog"></request-dialog>
  </div>
</template>

<script>
import { mdiDotsVertical, mdiChevronUp, mdiChevronDown, mdiStarOutline, mdiStar } from '@mdi/js'
import RequestDialog from '@/components/RequestDialog.vue'

export default {
  components: { RequestDialog },
  props: {
    request: {
      required: true,
    },
    title: {
      required: true,
    },
  },
  data() {
    return {
      icons: {
        mdiDotsVertical,
        mdiChevronUp,
        mdiChevronDown,
      },
      unActivestart: mdiStarOutline,
      ActiveStar: mdiStar,
      interval: null,
      selected: [],
      dialog: false,
      selectedItem: '',
    }
  },
  computed: {
    timeline() {
      return this.request.reverse()
    },
  },
  methods:{
    renderData(item){
      this.$refs.dialog.renderData(item);
      this.$refs.dialog.dialog = true
    }
  }
}
</script>
<style scoped>
::v-deep .theme--light.v-list-item--active::before {
  opacity: 0 !important;
}
::-webkit-scrollbar-track {
    background: none !important;
}
</style>