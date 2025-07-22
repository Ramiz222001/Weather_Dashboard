function WeatherCard({ data }) {
  const { name, main, weather, wind, unit } = data;
  const tempSymbol = unit === 'imperial' ? '°F' : '°C';

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '10px'
    }}>
      <h2>{name}</h2>
      <p>Temperature: {main.temp}{tempSymbol}</p>
      <p>Condition: {weather[0].main} ({weather[0].description})</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} {unit === 'imperial' ? 'mph' : 'm/s'}</p>
    </div>
  );
}

export default WeatherCard;
