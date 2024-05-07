import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import Quote from "./components/quote/quote";

import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastDaily, setForecastDaily] = useState(null);
  const [forecastHourly, setForecastHourly] = useState(null);

  const [curOpen, setCurOpen] = useState(null);

  function handleOnSearchChange(searchData) {
    const [lat, lon] = searchData.value.split(" ");
    setCurOpen(null);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=tr`
    );
    const forecastDailyFetch = fetch(
      `${WEATHER_API_URL}/forecast/daily?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=tr`
    );
    const forecastHourlyFetch = fetch(
      `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastDailyFetch, forecastHourlyFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastDailyResponse = await response[1].json();
        const forecastHourlyResponse = await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastDaily({ city: searchData.label, ...forecastDailyResponse });
        setForecastHourly({
          city: searchData.label,
          ...forecastHourlyResponse,
        });
        console.log(forecastHourlyResponse);
      })
      .catch((err) => console.error(err));
  }

  console.log(currentWeather);
  console.log(forecastHourly);
  // console.log(forecast);

  return (
    <div className="app">
      <Search onSearchChange={handleOnSearchChange} />
      {!currentWeather && <Quote currentWeather={currentWeather} />}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastDaily && (
        <Forecast data={forecastDaily} curOpen={curOpen} onOpen={setCurOpen} />
      )}
    </div>
  );
}

export default App;
