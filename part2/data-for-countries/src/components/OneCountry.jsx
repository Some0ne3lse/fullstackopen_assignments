import Weather from "./Weather";

const OneCountry = ({ finalCountry, weather }) => {
  return (
    <div>
      <h2>{finalCountry.name.common}</h2>
      <div>
        {finalCountry.capital.length === 1 ? (
          <div>capital {finalCountry.capital[0]}</div>
        ) : (
          <div>
            capitals{" "}
            {finalCountry.capital.map((c) => (
              <span key={c}>{c}, </span>
            ))}
          </div>
        )}
      </div>
      <div>area {finalCountry.area}</div>
      <br />
      <div>
        <b>languages:</b>
        <ul>
          {Object.values(finalCountry.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={finalCountry.flags.png} alt={finalCountry.flags.png.alt} />
      </div>
      {weather ? <Weather weather={weather} /> : null}
    </div>
  );
};

export default OneCountry;
