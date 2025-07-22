
# 🌦️ Weather Dashboard React App

A responsive, user-friendly weather dashboard built with **React**. It allows users to search for any city and view:

- Current weather conditions
- 5-day forecast
- Search history
- A weather trend chart

## 🚀 Features

- 🌤️ Real-time weather updates using OpenWeatherMap API
- 🔍 Search by city name
- 🕘 Maintains search history
- 📊 Line chart for temperature trends
- 🌙 Light/Dark mode toggle
- 🖥️ Responsive design

## 📁 Project Structure

```
Weather_Dashboard/
├── public/
│   └── index.html
├── src/
│   ├── assets/            # Optional images/icons
│   ├── components/        # Reusable React components
│   ├── utils/             # API handling (api.js)
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **React** (functional components + hooks)
- **CSS** for styling
- **Chart.js / Recharts** for forecast visualization
- **OpenWeatherMap API**

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/Ramiz222001/Weather_Dashboard.git
cd Weather_Dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Add your API key:

Create a `.env` file in the root and add:

```
REACT_APP_API_KEY=your_openweathermap_api_key
```

4. Run the app:

```bash
npm start
```

## ✅ To-Do

- Improve responsive layout for small screens
- Add unit tests
- Deploy to GitHub Pages or Vercel

## 🔗 API Reference

- [OpenWeatherMap](https://openweathermap.org/api)

---

Feel free to contribute or suggest improvements! ✨
