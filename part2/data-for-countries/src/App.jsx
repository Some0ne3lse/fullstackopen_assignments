import { useEffect, useState } from "react";
import Search from "./components/Search";
import axios from "axios";
import ErrorMessage from "./components/ErrorMessage";
import TenOrLessCountries from "./components/TenOrLessCountries";
import OneCountry from "./components/OneCountry";

const App = () => {
  const [allData, setAllData] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [country, setCountry] = useState([]);
  const [finalCountry, setFinalCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setAllData(response.data);
      })
      .catch(() => {
        setErrorMessage("Could not fetch countries");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  useEffect(() => {
    const filteredCountryArray = allData.filter(
      (d) =>
        d.name.common.toLowerCase().includes(searchCountries) ||
        d.name.official.toLowerCase().includes(searchCountries)
    );
    setCountry(filteredCountryArray);
  }, [allData, searchCountries]);

  useEffect(() => {
    if (country.length === 1) {
      setFinalCountry(country[0]);
    }
  }, [country, finalCountry]);

  useEffect(() => {
    if (finalCountry) {
      const api_key = import.meta.env.VITE_SOME_KEY;

      const lat = finalCountry.capitalInfo.latlng[0];
      const lon = finalCountry.capitalInfo.latlng[1];

      axios
        .get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch(() => {
          setErrorMessage("Could not fetch weather data");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  }, [finalCountry]);

  const handleCountriesSearch = (event) => {
    const searchedValue = event.target.value.toLowerCase();
    setSearchCountries(searchedValue);
  };

  const handleShowCountryButton = (name) => {
    setSearchCountries(name.toLowerCase());
  };

  if (allData.length == 0) {
    return (
      <div>
        <div>Could not fetch data</div>
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }

  if (country.length === 0) {
    return (
      <div>
        <Search value={searchCountries} onChange={handleCountriesSearch} />
        <ErrorMessage errorMessage={errorMessage} />

        <div>No country with this name</div>
      </div>
    );
  }

  if (country.length > 10) {
    return (
      <div>
        <Search value={searchCountries} onChange={handleCountriesSearch} />
        <ErrorMessage errorMessage={errorMessage} />
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  if (country.length <= 10 && country.length > 1) {
    return (
      <div>
        <Search value={searchCountries} onChange={handleCountriesSearch} />
        <ErrorMessage errorMessage={errorMessage} />
        <TenOrLessCountries
          countries={country}
          onClick={handleShowCountryButton}
        />
      </div>
    );
  }

  if (finalCountry) {
    return (
      <div>
        <Search value={searchCountries} onChange={handleCountriesSearch} />
        <ErrorMessage errorMessage={errorMessage} />
        <OneCountry finalCountry={finalCountry} weather={weather} />
      </div>
    );
  }

  return (
    <div>
      <div>Something went wrong</div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default App;
