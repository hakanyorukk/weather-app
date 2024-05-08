import { NavLink } from "react-router-dom";
import styles from "./current.module.css";
import "./current-weather.css";

function CurrentWeather({ curData }) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  console.log(curData);
  const nowInLocalTime = Date.now() + 1000 * curData.timezone;
  console.log(nowInLocalTime);

  const dateBuilder = (timezone) => {
    const nowInLocalTime = Date.now() + 1000 * (timezone / 3600);
    const millitime = new Date(nowInLocalTime);

    let day = millitime.toLocaleString("en-US", { weekday: "long" });
    let month = millitime.toLocaleString("en-US", { month: "long" });
    let date = millitime.toLocaleString("en-US", { day: "numeric" });
    let hours = millitime.toLocaleString("en-US", { hour: "numeric" });

    return `${day} ${date} ${month} ${hours}`;
  };
  const time = dateBuilder(curData.timezone);

  return (
    <>
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{curData.city}</p>
            <p className="time">{time}</p>
            <p className="weather-description">
              {capitalize(curData.weather[0].description)}
            </p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${curData.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temparature">{curData.main.temp.toFixed(1)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels Like</span>
              <span className="parameter-value">
                {Math.round(curData.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{curData.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{curData.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">
                {curData.main.pressure / 10} kPa
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/forecastdaily">Daily</NavLink>
          </li>
          <li>
            <NavLink to="/forecasthourly">Hourly</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default CurrentWeather;
