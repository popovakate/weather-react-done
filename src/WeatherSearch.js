import React, { useState } from "react";
import axios from "axios";

export default function WeatheraSearch(props) {
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function handleCity(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=28feed74ca8e6f8450fa975c80fe27e3&units=metric`;
    axios.get(url).then(showWeather);
  }

  function showWeather(response) {
    console.log({ response });
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setLoaded(true);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <from>
      <input
        type="search"
        placefolder="Enter a city..."
        autoFocus
        onChange={updateCity}
      />
      <input type="submit" value="Search" onClick={handleCity} />
      {city && (
        <div className="alert-container">
          <h1 className="alert-inner">
            <p></p>
          </h1>{" "}
        </div>
      )}
    </from>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Tempertature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img alt="icon" src={weather.icon} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
