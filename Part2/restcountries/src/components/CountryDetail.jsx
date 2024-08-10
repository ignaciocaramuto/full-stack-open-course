import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  useEffect(() => {
    weatherService.getWeather(lat, lon).then((weather) => {
      setWeather(weather);
      setIcon(weatherService.getIcon(weather?.current.weather[0].icon));
    });
  }, [lat, lon]);

  if (country === null) return null;
  const keys = Object.keys(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p style={{ fontWeight: "bold" }}>languages</p>
      {keys.map((key) => (
        <li key={key}>{country.languages[key]}</li>
      ))}
      <br />
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather?.current.temp} Celsius</p>
      <img src={icon}></img>
      <p>wind {weather?.current.wind_speed} m/s</p>
    </div>
  );
};

export default CountryDetail;
