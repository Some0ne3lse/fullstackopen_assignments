import { useEffect, useState } from "react";
import axios from "axios";

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
  return <div>{country}</div>;
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

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
  };

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
      <ShowDetails country="details" showMessage={showDetails} />
    </div>
  );
}

export default App;
