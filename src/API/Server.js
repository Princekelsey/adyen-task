import axios from "axios";
import { KIWI_URL, WEATHER_URL } from "./url";

const Server = {
  getCurrentLocation: async (lat, lon) => {
    const url = `${KIWI_URL}/locations/radius`;
    return await axios.get(url, {
      headers: { apikey: process.env.VUE_APP_KIWI_KEY },
      params: {
        lat,
        lon,
        radius: 250,
        locale: "en-US",
        location_types: "airport",
        limit: 5,
        active_only: true,
      },
    });
  },

  searchFlight: async (flyFrom, flyTo, dateFrom, dateTo) => {
    const url = `${KIWI_URL}/v2/search`;
    return axios.get(url, {
      headers: { apikey: process.env.VUE_APP_KIWI_KEY },
      params: {
        fly_from: flyFrom,
        fly_to: flyTo,
        date_from: dateFrom,
        date_to: dateTo,
        max_fly_duration: 20,
        flight_type: "oneway",
        one_for_city: 1,
        one_per_date: 1,
        adults: 1,
        partner_market: "us",
        max_stopovers: 2,
        vehicle_type: "aircraft",
      },
    });
  },

  getLocationKey: async (city) => {
    const url = `${WEATHER_URL}/locations/v1/cities/search`;
    return axios.get(url, {
      params: { apikey: process.env.VUE_APP_ACCU_KEY, q: city },
    });
  },

  getForecast: async (locationKey) => {
    const url = `${WEATHER_URL}/forecasts/v1/daily/5day/${locationKey}`;
    return axios.get(url, { params: { apikey: process.env.VUE_APP_ACCU_KEY } });
  },
};

export default Server;
