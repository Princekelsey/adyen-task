<template>
  <b-card class="mb-3 shadow-sm">
    <h6 class="date">{{ formartDate }}</h6>
    <div class="d-flex mb-2">
      <span>
        <strong>Day:</strong>
        {{ weatherData.Day.IconPhrase }}
      </span>
      <span class="ml-2">
        <strong>Night:</strong>
        {{ weatherData.Night.IconPhrase }}
      </span>
    </div>
    <div class="d-flex">
      <span>
        <strong>Min Temp:</strong>
        {{ convertToCelcius(weatherData.Temperature.Minimum.Value) }}&deg;
      </span>
      <span class="ml-2">
        <strong>Max Temp:</strong>
        {{ convertToCelcius(weatherData.Temperature.Maximum.Value) }}&deg;
      </span>
    </div>
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  name: "Weather",
  props: {
    weatherData: Object,
  },
  computed: {
    formartDate() {
      if (this.weatherData.Date) {
        return moment(this.weatherData.Date).format("MMM Do YYYY");
      } else {
        return "";
      }
    },
  },
  methods: {
    convertToCelcius(temp) {
      if (this.weatherData.Temperature) {
        return Math.round(((temp - 32) * 5) / 9);
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.date {
  color: #0abf53;
  font-weight: 400;
}
</style>
