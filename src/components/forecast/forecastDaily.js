import CurrentWeather from "../current-weather/current-weather";
import "./forecastDaily.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function ForecastDaily({ data, curOpen, onOpen, curData }) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <CurrentWeather curData={curData} />

      <Accordion
        data={data}
        forecastDays={forecastDays}
        curOpen={curOpen}
        onOpen={onOpen}
      />
    </>
  );
}

function Accordion({ data, forecastDays, curOpen, onOpen }) {
  return (
    <div className="daily-container">
      {data.list.map((item, index) => (
        <AccordionItem
          index={index}
          key={index}
          item={item}
          forecastDays={forecastDays}
          curOpen={curOpen}
          onOpen={onOpen}
        ></AccordionItem>
      ))}
    </div>
  );
}
function AccordionItem({ item, forecastDays, index, curOpen, onOpen }) {
  const isOpen = index === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : index);
    // console.log(index);
    // console.log(curOpen);
  }
  // console.log(isOpen);
  return (
    <div>
      <AccordionItemHeading
        item={item}
        forecastDays={forecastDays}
        index={index}
        onToggle={handleToggle}
      />
      {isOpen && <AccordionItemPanel item={item} />}
    </div>
  );
}
function AccordionItemHeading({ item, forecastDays, index, onToggle }) {
  return (
    <div className="daily-item" onClick={onToggle}>
      <img
        alt="weather"
        className="icon-small"
        src={`icons/${item.weather[0].icon}.png`}
      />
      <label className="day">{forecastDays[index]}</label>
      <label className="day-temp">{Math.round(item.temp.day)}°C</label>

      <label className="description">{item.weather[0].description}</label>
      <label className="min-max">
        {Math.round(item.temp.min)}°C / {Math.round(item.temp.max)}
        °C
      </label>
    </div>
  );
}
function AccordionItemPanel({ item }) {
  return (
    <div className="daily-details-grid">
      <div className="daily-details-grid-item">
        <label>Pressure:</label>
        <label>{item.pressure / 10}</label>
      </div>
      <div className="daily-details-grid-item">
        <label>Humidity:</label>
        <label>{item.humidity}</label>
      </div>

      <div className="daily-details-grid-item">
        <label>Wind speed:</label>
        <label>{item.speed} m/s</label>
      </div>
      <div className="daily-details-grid-item">
        <label>Feels like:</label>
        <label>{item.feels_like.day}°C</label>
      </div>
      <div className="daily-details-grid-item">
        <label>Clouds: </label>
        <label>{item.clouds} %</label>
      </div>
      <div className="daily-details-grid-item">
        <label>Rain: </label>
        <label>{item.rain ? item.rain : "No Rain"}</label>
      </div>
    </div>
  );
}
export default ForecastDaily;
