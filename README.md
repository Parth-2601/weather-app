# 🌦️ Weather App

A modern and responsive weather application that provides real-time weather information using city search or your current location.

## 🚀 Features
- 🔍 City name autocomplete with live suggestions
- 📍 Weather by geolocation
- 🌡️ Temperature (°C/°F), humidity, pressure, wind, and visibility
- 📅 5-day forecast
- 🌓 Light/Dark mode toggle
- ⚙️ Unit switch for temperature (Celsius ↔ Fahrenheit)
- 📱 Fully responsive for mobile, tablet, and desktop

## 🛠️ Tech Stack

| Tech               | Description                    |
|--------------------|--------------------------------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Markup structure |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Styling |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Functionality |
| ![OpenWeather](https://img.shields.io/badge/OpenWeather-FF6B6B?style=flat&logo=cloudflare&logoColor=white) | Weather Data API |
| ![GeoDB API](https://img.shields.io/badge/GeoDB-RapidAPI-blue?style=flat&logo=rapidapi&logoColor=white) | Autocomplete Suggestions |

## 📦 Setup & Installation
1. Clone the repository:
   ```sh
   git clone  https://github.com/Parth-2601/weather-app.git
   ```
2. Navigate to the project folder:
   ```sh
   cd weather-app
   ```
3. Open `index.html` in a browser.

## 🔑 API Key Configuration
Replace `apiKey` in `script.js` with your OpenWeather API key:
```js
const apiKey = "your_api_key_here";
const geoApiHeaders = {
  "X-RapidAPI-Key": "your_rapidapi_key_here",
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
};
```

## 📜 Code Overview
### HTML (`index.html`)
- Semantic and accessible structure
- Weather data display + search bar

### CSS (`style.css`)
- Responsive design and smooth transitions
- Theme variables and scrollbar customizations

### JavaScript (`script.js`)
- Fetches current and forecast weather
- Autocomplete suggestions with GeoDB API
- Geolocation weather fetching

## 🖥️ Usage
1. ✏️ Enter a city name — suggestions will appear.
2. 📍 Allow location access to get current weather automatically.
3. 📊 View 5-day forecast and real-time weather info.

## ❗ Troubleshooting
- 🔐 Make sure both API keys are valid
- 🌐 Check console for network or CORS issues
- 🧭 Geolocation must be allowed in browser

## 🤝 Contributing
Pull requests are welcome! 🎉

