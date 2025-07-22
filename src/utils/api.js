import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeather = async (city, unit = 'metric') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
  const response = await axios.get(url);

  if (response.status === 200 && response.data.cod === 200) {
    return response.data;
  } else {
    throw new Error('City not found');
  }
};

export const fetchForecast = async (city, unit = 'metric') => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`;
  const response = await axios.get(url);

  if (response.status === 200 && response.data.cod === "200") {
    return response.data;
  } else {
    throw new Error('Forecast not available');
  }
};
