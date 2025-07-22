import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function ForecastChart({ data, unit, type = 'temp' }) {
  if (!data) return null;

  const dailyData = [];
  const seenDays = new Set();

  data.list.forEach(item => {
    const date = new Date(item.dt_txt);
    const day = date.toDateString();
    const hour = date.getHours();

    if (!seenDays.has(day) && hour === 12) {
      seenDays.add(day);
      dailyData.push(item);
    }
  });

  let label = '';
  let chartValues = [];

  switch (type) {
    case 'humidity':
      label = 'Humidity (%)';
      chartValues = dailyData.map(item => item.main.humidity);
      break;
    case 'wind':
      label = unit === 'imperial' ? 'Wind Speed (mph)' : 'Wind Speed (m/s)';
      chartValues = dailyData.map(item => item.wind.speed);
      break;
    case 'temp':
    default:
      label = `Midday Temperature (${unit === 'imperial' ? '°F' : '°C'})`;
      chartValues = dailyData.map(item => item.main.temp);
      break;
  }

  const chartData = {
    labels: dailyData.map(item =>
      new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })
    ),
    datasets: [
      {
        label,
        data: chartValues,
        fill: false,
        borderColor: '#007bff',
        backgroundColor: '#007bff',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#999'
        }
      },
      x: {
        ticks: {
          color: '#999'
        }
      }
    }
  };

  return (
    <div className="forecast-chart-container">
      <h3 style={{ marginBottom: '1rem' }}>{label}</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default ForecastChart;
