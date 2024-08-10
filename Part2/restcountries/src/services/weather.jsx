import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";

const getWeather = (lat, lon) => {
  return axios
    .get(
      `${baseUrl}?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    )
    .then((response) => response.data);
};

const getIcon = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

export default { getWeather, getIcon };
