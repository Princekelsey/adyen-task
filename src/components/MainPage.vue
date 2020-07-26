<template>
  <div>
    <div class="search-container">
      <b-container>
        <b-row class="mt-3">
          <b-col md="6" class="mb-3">
            <b-row>
              <b-col md="6" class="mb-3">
                <Spinner v-if="isFetchingLocation" />
                <div v-else>
                  <span>Current location:</span>
                  <b-form-select
                    v-model="selecetedLocation"
                    :options="currentLocation"
                  ></b-form-select>
                </div>
              </b-col>
              <b-col md="6" class="mb-3">
                <span>Destination:</span>
                <b-form-select
                  v-model="selectedDestination"
                  :options="destinationOptions"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <b-row>
              <b-col md="6" class="mb-3">
                <div class>
                  <span>Search start date:</span>
                  <b-form-datepicker
                    id="start-datepicker"
                    v-model="startDate"
                    class
                  ></b-form-datepicker>
                </div>
              </b-col>
              <b-col md="6" class="mb-3">
                <div>
                  <span>Search end date:</span>
                  <b-form-datepicker
                    id="end-datepicker"
                    v-model="endDate"
                    class
                  ></b-form-datepicker>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <div class="text-center mt-2 mb-2">
          <b-button variant="light" :disabled="isDisabled" @click="handleSearch"
            >Search</b-button
          >
        </div>
      </b-container>
    </div>
    <b-container class="mt-4 mb-3">
      <b-row>
        <b-col md="6">
          <Spinner v-if="isWeatherFetching" color="success" />
          <div v-if="weatherForecast.length">
            <h4>Weather forecast for 5 days</h4>
            <Weather
              v-for="forecast in weatherForecast"
              :weatherData="forecast"
              :key="forecast.Date"
            />
          </div>
          <div v-if="forecastMessage" class="text-center">
            <h3>{{ forecastMessage }}</h3>
          </div>
        </b-col>
        <b-col md="6">
          <Spinner v-if="isFlightFetching" color="success" />
          <div v-if="flightDetails.length">
            <h4>Flight details</h4>
            <FlightDetails
              v-for="details in flightDetails"
              :key="details.id"
              :flightData="details"
              :currency="currency"
            />
          </div>
          <div v-if="flightMessage" class="text-center">
            <h3>{{ flightMessage }}</h3>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Server from "../API/Server";
import Weather from "./Weather";
import Spinner from "./Spinner";
import FlightDetails from "./FlightDetails";
import { composeResponseData } from "../utils";
import momemt from "moment";
export default {
  name: "MainPage",
  components: {
    Weather,
    Spinner,
    FlightDetails,
  },
  data() {
    return {
      selectedDestination: null,
      selecetedLocation: null,
      startDate: "",
      endDate: "",
      destinationOptions: [
        { value: null, text: "Please select a country" },
        { value: "AMS", text: "Amsterdam" },
        { value: "MAD", text: "Madrid" },
        { value: "BUD", text: "Budapest" },
      ],
      currentLocation: [],
      isError: false,
      weatherForecast: [],
      flightDetails: [],
      currency: "",
      isWeatherFetching: false,
      isFetchingLocation: false,
      forecastMessage: "",
      isFlightFetching: false,
      flightMessage: "",
    };
  },
  computed: {
    isDisabled() {
      if (
        this.selectedDestination &&
        this.startDate &&
        this.endDate &&
        this.selecetedLocation
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    fetchWeatherData() {
      if (this.selectedDestination === "AMS") {
        Server.getLocationKey("Amsterdam")
          .then((res) => {
            Server.getForecast(res.data[0].Key)
              .then(({ data: { DailyForecasts } }) => {
                this.weatherForecast = DailyForecasts;
                this.forecastMessage = "";
                this.isWeatherFetching = false;
              })
              .catch(() => {
                this.isWeatherFetching = false;
                this.forecastMessage = "Error getting weather information";
                this.weatherForecast = [];
              });
          })
          .catch(() => {
            this.isWeatherFetching = false;
            this.forecastMessage = "Error getting weather information";
            this.weatherForecast = [];
          });
      }
      if (this.selectedDestination === "MAD") {
        Server.getLocationKey("Madrid")
          .then((res) => {
            Server.getForecast(res.data[0].Key)
              .then(({ data: { DailyForecasts } }) => {
                this.weatherForecast = DailyForecasts;
                this.forecastMessage = "";
                this.isWeatherFetching = false;
              })
              .catch(() => {
                this.isWeatherFetching = false;
                this.forecastMessage = "Error getting weather information";
                this.weatherForecast = [];
              });
          })
          .catch(() => {
            this.isWeatherFetching = false;
            this.forecastMessage = "Error getting weather information";
            this.weatherForecast = [];
          });
      }

      if (this.selectedDestination === "BUD") {
        Server.getLocationKey("Budapest")
          .then((res) => {
            Server.getForecast(res.data[0].Key)
              .then(({ data: { DailyForecasts } }) => {
                this.weatherForecast = DailyForecasts;
                this.forecastMessage = "";
                this.isWeatherFetching = false;
              })
              .catch(() => {
                this.isWeatherFetching = false;
                this.forecastMessage = "Error getting weather information";
                this.weatherForecast = [];
              });
          })
          .catch(() => {
            this.isWeatherFetching = false;
            this.forecastMessage = "Error getting weather information";
            this.weatherForecast = [];
          });
      }
    },
    handleSearch() {
      this.isWeatherFetching = true;
      this.isFlightFetching = true;
      this.flightMessage = "";
      this.forecastMessage = "";
      this.weatherForecast = [];
      this.flightDetails = [];
      this.fetchWeatherData();
      this.getFlightInfo();
    },

    getFlightInfo() {
      const dateFrom = momemt(this.startDate).format("DD/MM/YYYY");
      const dateTo = momemt(this.endDate).format("DD/MM/YYYY");
      Server.searchFlight(
        this.selecetedLocation,
        this.selectedDestination,
        dateFrom,
        dateTo
      )
        .then(({ data: { data, currency } }) => {
          if (data.length) {
            this.flightMessage = "";
          } else {
            this.flightMessage = "No flight for the selected days";
          }
          this.flightDetails = data;
          this.currency = currency;
          this.isFlightFetching = false;
        })
        .catch(() => {
          this.isFlightFetching = false;
          this.flightMessage = "Error getting flight details";
        });
    },
  },
  mounted: function() {
    this.isFetchingLocation = true;
    const navigation = navigator.geolocation;
    if (navigation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          Server.getCurrentLocation(latitude, longitude)
            .then((res) => {
              this.currentLocation = composeResponseData(res.data.locations);
              this.isFetchingLocation = false;
            })
            .catch(() => {
              this.isError = true;
              this.isFetchingLocation = false;
              alert("Error getting location information, please try again");
            });
        }
      );
    } else {
      this.isError = true;
      this.isFetchingLocation = false;
      alert(
        "Error getting location, please give application access to your location"
      );
    }
  },
};
</script>

<style scoped>
.search-container {
  height: auto;
  background-color: #0abf53;
  width: auto;
  padding: 5px 5px;
}

span {
  color: #fff;
  font-weight: 400;
}
</style>
