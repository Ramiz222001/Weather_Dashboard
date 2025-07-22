import React from 'react';

function ForecastList({ data, unit, darkMode }) {
  if (!data) return null;

  const dailyForecast = [];
  const seenDays = new Set();

  data.list.forEach(item => {
    const date = new Date(item.dt_txt);
    const day = date.toDateString();
    const hour = date.getHours();

    if (!seenDays.has(day) && hour === 12) {
      seenDays.add(day);
      dailyForecast.push(item);
    }
  });

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>5-Day Forecast</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {dailyForecast.map((item, index) => (
          <div
            key={index}
            className="forecast-card"
            style={{
              backgroundColor: darkMode ? '#2a2a2a' : '#f9f9f9',
              color: darkMode ? '#fff' : '#000',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '80px',
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'long' })}</strong>
              <div style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#666' }}>
                {item.weather[0].description}
              </div>
            </div>

            <div
              style={{
                flex: '0 0 60px',
                backgroundColor: '#e0e0e0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                style={{ width: '48px', height: '48px' }}
              />
            </div>

            <div style={{ flex: 1, textAlign: 'right' }}>
              <strong>{Math.round(item.main.temp)}°{unit === 'imperial' ? 'F' : 'C'}</strong>
              <div style={{ fontSize: '0.8rem' }}>
                💧 {item.main.humidity}% | 💨 {item.wind.speed}
                {unit === 'imperial' ? ' mph' : ' m/s'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;
