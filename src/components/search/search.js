import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import "./search.css";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  function loadOptions(inputValue) {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  }

  function handleOnChange(searchData) {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}
//Prefetn too fast api request
export default Search;
