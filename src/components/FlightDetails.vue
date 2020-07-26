<template>
  <b-card class="mb-2 shadow-sm">
    <h6 class="heading">Details</h6>
    <div class="d-flex mb-2">
      <span><strong>From: </strong> {{ flightData.cityFrom }}</span>
      <span class="ml-2"><strong>To: </strong> {{ flightData.cityTo }}</span>
    </div>
    <div class="d-flex mb-2">
      <span><strong>Price: </strong> {{ flightData.price }}{{ currency }}</span>
      <span class="ml-2"><strong>Duration: </strong> {{ formatDuration }}</span>
    </div>
    <div class="mb-2">
      <span
        ><strong>Departure: </strong>
        {{ convertDate(flightData.utc_departure) }}</span
      >
    </div>
    <div class="mb-2">
      <span
        ><strong>Arrival: </strong>
        {{ convertDate(flightData.utc_arrival) }}</span
      >
    </div>
    <hr />
    <div class="mb-2">
      <h6 class="heading">Routes</h6>
      <div v-for="data in flightData.route" :key="data.id">
        <div class="d-flex mb-2">
          <span><strong>From: </strong> {{ data.cityFrom }}</span>
          <span class="ml-2"><strong>To: </strong> {{ data.cityTo }}</span>
        </div>
        <div class="mb-2">
          <span
            ><strong>Departure: </strong>
            {{ convertDate(data.utc_departure) }}</span
          >
        </div>
        <div class="mb-2">
          <span
            ><strong>Arrival: </strong>
            {{ convertDate(data.utc_arrival) }}</span
          >
        </div>
        <hr />
      </div>
    </div>
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  name: "FlightDetails",
  props: {
    flightData: Object,
    currency: String,
  },

  computed: {
    formatDuration() {
      if (this.flightData.duration) {
        return moment(this.flightData.duration.total).format("HH:mm");
      } else {
        return "";
      }
    },
  },
  methods: {
    convertDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.heading {
  color: #0abf53;
  font-weight: 400;
}
</style>
