<template>
  <section>
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="adjust-title"> Apply Filter </v-card-title>
        <v-form ref="form">
          <v-row class="pa-6">
            <v-col lg="4" md="4">
              <v-select
                :items="category"
                v-model="selectPickerType"
                item-text="state"
                class="mt-2"
                placeholder="Select Type"
                @change="onClear()"
                prepend-icon="mdi-clock-time-twelve"
              />
            </v-col>
            <v-col lg="4" md="4">
              <v-select
                :items="type"
                v-model="selectedType"
                item-text="state"
                placeholder="Select Type"
              />
            </v-col>
            <v-col lg="8" md="8">
              <!-- <v-select
                v-model="selectedTrxVolume"
                :items="withTrxVolume"
                label="Please Select"
              ></v-select> -->
              <v-select
                v-if="selectedType == 'Organizations'"
                v-model="select"
                item-text="state"
                :items="withTrxVolume"
                return-object
                single-line
                label="Please Select"
              ></v-select>
              <v-select
                v-if="selectedType != 'Organizations'"
                v-model="select"
                item-text="state"
                :items="withTrxVolume"
                return-object
                single-line
                label="Please Select"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="danger" text @click="dialog = false"> Cancel </v-btn>
          <v-btn
            color="primary"
            text
            :loading="loader"
            @click="highestLowestTrxVol()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="ma-2 pb-0">
      <v-col lg="10">
        <h4 class="mt-2" style="color: rgba(0, 0, 0, 0.64)">
          Transactions Count / Volumes (Highest / Lowest)
        </h4>
      </v-col>
      <v-col lg="2">
        <v-btn
          :disabled="validated == false"
          @click="openDialog()"
          depressed
          small
          class="float-right mt-2"
        >
          <v-icon small class="mr-2 filter-icon"> mdi-filter </v-icon>
          Filters
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card :loading="loadingGraph">
      <highcharts :options="barChart" ref="chart"></highcharts>
    </v-card>
  </section>
</template>
<script>
import axios from "axios";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);
export default {
  components: {
  },
  data() {
    return {
      loader: false,
      loading: false,
      loadingGraph: false,
      validated: false,
      date: "",
      todayDate: "",
      currentMonth: "",
      previousMonth: "",
      month: "",
      dialog: false,
      selectedTrxVolume: [],
      selectedCategory: "",
      category: [
        {
          state: "Daily",
        },
        {
          state: "Monthly",
        },
      ],
      selectPickerType: {
        state: "Daily",
      },
      type: [
        {
          state: "Merchants",
        },
        {
          state: "Organizations",
        },
      ],
      selectedType: {
        state: "Merchants",
      },
      select: {
        state:
          "Top 10 Merchants Highest Volumes With Lowest Transactions Count",
      },
      withTrxVolume: [
        {
          state:
            "Top 10 Merchants Highest Volumes With Lowest Transactions Count",
        },
        {
          state:
            "Bottom 10 Merchants Lowest Volumes With Highest Transactions Count",
        },
      ],
      barChart: {
        colors: ["#644DED", "#9F91F3"],
        
        chart: {
          backgroundColor: "#f9f9fc",
          type: "column",
        },
        title: {
          text: this.setTitle,
          fontSize: "12px",
          align: "left",
        },
        xAxis: {
          categories: [],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "test",
            data: [4],
          },
          {
            name: "test",
            data: [1],
          },
        ],
      },
    };
  },
  methods: {
    onClear() {
      if (this.selectPickerType == "Daily") {
        this.month = "";
      }
      if (this.selectPickerType == "Monthly") {
        this.date = "";
      }
    },
    openDialog() {
      this.dialog = true;
    },
    updateMonth(month) {
      this.month = month;
    },
    updateDailyDate(date) {
      this.date = date;
    },
    setTitle() {
      const date = new Date(this.month);
      const month = date.toLocaleString("default", { month: "long" });
      this.barChart.title.text = this.select.state + " For " + this.date;
      if (this.selectPickerType == "Daily") {
        this.barChart.title.text = this.select.state + " For " + this.date;
      }
      if (this.selectPickerType == "Monthly") {
        this.barChart.title.text =
          this.select.state +
          " For " +
          month +
          " " +
          this.month.substring(0, 4);
      }
    },
    highestLowestTrxVol() {
      this.loadingGraph = true;
      this.loader = true;
      axios
        .post(
          "/highest-lowest-volumes-and-trx-count",
          {
            highestVolumeAndLowTrxCount:
              this.select.state ==
              "Top 10 Merchants Highest Volumes With Lowest Transactions Count"
                ? true
                : false,
            lowVolumeAndHighestTrxCount:
              this.select.state ==
              "Bottom 10 Merchants Lowest Volumes With Highest Transactions Count"
                ? true
                : false,
            organization: this.selectedType == "Organizations" ? true : false,
            monthOfYear: this.currentMonth,
            date: this.date,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.loadingGraph = false;
          this.setTitle();
          (this.validated = true), (this.loader = false);
          this.dialog = false;
          this.barChart.series = response.data.series;
          this.barChart.xAxis.categories = response.data.categories;
        })
        .catch((error) => {
          this.loadingGraph = false;
          this.setTitle();
          (this.validated = true), (this.loader = false);
          this.dialog = false;
          console.log(error);
        });
    },
  },
  mounted() {
    let today = new Date();
    today.setDate(today.getDate() - 1);
    this.todayDate = today.toISOString().slice(0, 10);
    this.date = today.toISOString().slice(0, 10);
    this.setTitle();
    this.highestLowestTrxVol();
  },
};
</script>
