import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import ForecastDaily from "./components/forecast/forecastDaily";
import Quote from "./components/quote/quote";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useEffect, useState } from "react";
import ForecastHourly from "./components/forecast/forecastHourly";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastDaily, setForecastDaily] = useState(null);
  const [forecastHourly, setForecastHourly] = useState(null);

  const [curOpen, setCurOpen] = useState(null);

  useEffect(() => {
    // On component mount (similar to componentDidMount), redirect to the default path
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  function handleOnSearchChange(searchData) {
    const [lat, lon] = searchData.value.split(" ");
    setCurOpen(null);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=en`
    );
    const forecastDailyFetch = fetch(
      `${WEATHER_API_URL}/forecast/daily?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=en`
    );
    const forecastHourlyFetch = fetch(
      `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=en`
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

  // console.log(currentWeather);
  // console.log(forecastHourly);
  // console.log(forecast);

  return (
    <div className="app">
      <Search onSearchChange={handleOnSearchChange} />
      {!currentWeather && <Quote currentWeather={currentWeather} />}

      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={
              currentWeather ? (
                <CurrentWeather curData={currentWeather} />
              ) : null
            }
          />
          <Route
            path="forecastdaily"
            element={
              forecastDaily ? (
                <ForecastDaily
                  data={forecastDaily}
                  curOpen={curOpen}
                  onOpen={setCurOpen}
                  curData={currentWeather}
                />
              ) : null
            }
          />
          <Route
            path="forecasthourly"
            element={
              forecastHourly ? (
                <ForecastHourly
                  data={forecastHourly}
                  curData={currentWeather}
                />
              ) : null
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/">
            {currentWeather && <CurrentWeather data={currentWeather} />}
          </Route>
          <Route
            path="forecastdaily"
            element={
              forecastDaily && (
                <ForecastDaily
                  data={forecastDaily}
                  curOpen={curOpen}
                  onOpen={setCurOpen}
                />
              )
            }
          />
          <Route
            path="forecasthourly"
            element={forecastHourly && <ForecastHourly data={forecastHourly} />}
          />
        </Routes>
      </BrowserRouter> */}
      {/* {forecastDaily && (
        <ForecastDaily
          data={forecastDaily}
          curOpen={curOpen}
          onOpen={setCurOpen}
        />
      )}
      {forecastHourly && <ForecastHourly data={forecastHourly} />} */}
    </div>
  );
}

export default App;
