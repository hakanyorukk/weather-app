import { NavLink } from "react-router-dom";

function ForecastNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/forecastdaily">Daily222</NavLink>
        </li>
        <li>
          <NavLink to="/forecasthourly">Hourly</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ForecastNav;
