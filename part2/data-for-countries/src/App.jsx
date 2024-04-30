import { useEffect, useState } from "react";
import axios from "axios";

import countryService from "./services/country";

const CountriesToShow = ({ countries, showTen }) => {
  if (!showTen) {
    return null;
  }
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
};

const ShowMoreThanTenMessage = ({ message, showTen }) => {
  if (!showTen) {
    return null;
  }
  return <div>{message}</div>;
};

const ShowDetails = ({ country, showMessage }) => {
  if (!showMessage) {
    return null;
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map((key, index) => (
          <li key={index}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country flag" />
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [fullCountry, setFullCountry] = useState({});
  const [country, setCountry] = useState("finland");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = countries.filter((findCountry) =>
      findCountry.name.common.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
    if (filtered.length == 1) {
      let first = filtered[0];
      if (first) {
        setCountry(first.name.common);
      }
    }
  };

  useEffect(() => {
    countryService.getOne(country).then((initialCountry) => {
      setFullCountry(initialCountry);
    });
  }, [country]);

  let showTen = false;
  let showMessage = false;
  let showDetails = false;

  if (filteredCountries.length < 11 && filteredCountries.length > 1) {
    showTen = true;
    showDetails = false;
    showMessage = false;
  } else if (filteredCountries.length > 10) {
    showMessage = true;
    showTen = false;
    showDetails = false;
  } else if (filteredCountries.length === 1) {
    showDetails = true;
    showMessage = false;
    showTen = false;
  } else {
    showTen = false;
    showDetails = false;
    showMessage = false;
  }

  return (
    <div>
      <div>
        find countries <input onChange={handleFilter}></input>
      </div>
      <CountriesToShow countries={filteredCountries} showTen={showTen} />
      <ShowMoreThanTenMessage message="message" showTen={showMessage} />
      <ShowDetails country={fullCountry} showMessage={showDetails} />
    </div>
  );
}

export default App;
