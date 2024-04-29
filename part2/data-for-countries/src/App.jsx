import { useEffect, useState } from "react";
import axios from "axios";
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

  return (
    <div>
      <div>
        find countries <input onChange={handleFilter}></input>
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
