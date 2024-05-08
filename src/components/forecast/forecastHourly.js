import CurrentWeather from "../current-weather/current-weather";
import "./forecastHourly.css";

function ForecastHourly({ data, curData }) {
  console.log(data);

  return (
    <div>
      <CurrentWeather curData={curData} />
      <div className="hourly-container">
        {data.list.map((item, index) => (
          <ForecastHour item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function ForecastHour({ item, index }) {
  function dataBuilder() {
    const unixTimestamp = item.dt;

    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);
    const localHour = dateObject.toLocaleString("en-US", { hour: "numeric" });
    const localDate = dateObject.toLocaleString("en-US", { day: "numeric" });
    const localDay = dateObject.toLocaleString("en-US", {
      weekday: "long",
    });
    return { localHour, localDate, localDay };
  }

  const { localHour, localDate, localDay } = dataBuilder();
  return (
    <div key={index} className="hourly-item">
      <img
        alt="weather"
        className="icon-small"
        src={`icons/${item.weather[0].icon}.png`}
      />
      <label className="hour">{localHour}</label>
      <div className="day-hour">
        <label>{localDay} </label>
        <label>{localDate}</label>
      </div>
      <label className="hour-temp">{Math.round(item.main.temp)}°C</label>
      <div className="clouds">
        <label>Clouds: </label>
        <label>{item.clouds.all} %</label>
      </div>
      <label className="description">{item.weather[0].description}</label>
      <div className="wind-speed">
        <label>Wind speed: </label>
        <label>{item.wind.speed} m/s</label>
      </div>
    </div>
  );
}

export default ForecastHourly;
