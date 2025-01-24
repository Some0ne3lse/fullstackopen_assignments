const Weather = ({ weather }) => {
  return (
    <div>
      <h2>Weather</h2>
      <div>temperature {weather.current.temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
        alt={weather.current.weather[0].description}
      />
      <div>wind {weather.current.wind_speed} m/s</div>
    </div>
  );
};

export default Weather;
