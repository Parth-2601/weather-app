const apiKey = "78604f113006592455d8d7f710e8d37f";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const input = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const unitBtns = document.querySelectorAll(".unit-btn");
const suggestions = document.getElementById("suggestions");
let currentUnit = "metric";

const geoApiHeaders = {
  "X-RapidAPI-Key": "7ab2d48d60msh14c2ff700619678p1e591ejsn79201610db87",
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
};

function getWeatherIcon(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

function formatTime(ts) {
  return new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDay(ts) {
  return new Date(ts * 1000).toLocaleDateString([], { weekday: "short" });
}

function updateTime() {
  const now = new Date();
  document.querySelector(".update-time").textContent = now.toLocaleTimeString();
}

function displayForecast(data) {
  const forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = "";
  for (let i = 0; i < 40; i += 8) {
    const f = data.list[i];
    const item = document.createElement("div");
    item.className = "forecast-item";
    item.innerHTML = `
      <div class="forecast-day">${formatDay(f.dt)}</div>
      <img src="${getWeatherIcon(f.weather[0].icon)}" class="forecast-icon">
      <div class="forecast-temp"><strong>${Math.round(f.main.temp)}°</strong></div>
      <div class="forecast-extra">
        <small>Feels: ${Math.round(f.main.feels_like)}°</small><br>
        <small>Min: ${Math.round(f.main.temp_min)}°, Max: ${Math.round(f.main.temp_max)}°</small><br>
        <small>Humidity: ${f.main.humidity}%</small><br>
        <small>${f.weather[0].main}</small>
      </div>
    `;
    forecastElement.appendChild(item);
  }
}

async function fetchForecast(city) {
  const res = await fetch(forecastUrl + city + `&appid=${apiKey}`);
  const data = await res.json();
  displayForecast(data);
}

async function checkWeather(city, unit = currentUnit) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=${unit}&q=${city}&appid=${apiKey}`);
  if (res.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }
  const data = await res.json();
  const { main, name, sys, weather, wind, visibility, timezone } = data;
  document.querySelector(".city").textContent = `${name}, ${sys.country}`;
  document.querySelector(".temp").textContent = `${Math.round(main.temp)}°${unit === "metric" ? "C" : "F"}`;
  document.querySelector(".description").textContent = weather[0].description;
  document.querySelector(".humidity").textContent = `${main.humidity}%`;
  document.querySelector(".wind").textContent = `${Math.round(wind.speed)} ${unit === "metric" ? "km/h" : "mph"}`;
  document.querySelector(".pressure").textContent = `${main.pressure} hPa`;
  document.querySelector(".visibility").textContent = `${(visibility / 1000).toFixed(1)} km`;
  document.querySelector(".extra-details").textContent = `Feels like: ${Math.round(main.feels_like)}°, Min: ${Math.round(main.temp_min)}°, Max: ${Math.round(main.temp_max)}°`;

  weatherIcon.src = getWeatherIcon(weather[0].icon);
  document.querySelector(".sun-times").innerHTML = `<i class="fas fa-sun"></i> Sunrise: ${formatTime(sys.sunrise)} &nbsp;&nbsp; <i class="fas fa-moon"></i> Sunset: ${formatTime(sys.sunset)}`;
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
  updateTime();
  await fetchForecast(city);
  localStorage.setItem("lastCity", city);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=${currentUnit}&appid=${apiKey}`);
      const data = await res.json();
      checkWeather(data.name);
    }, () => {
      const lastCity = localStorage.getItem("lastCity") || "New York";
      checkWeather(lastCity);
    });
  }
}

input.addEventListener("input", async () => {
  const query = input.value.trim();
  suggestions.innerHTML = "";
  if (!query || query.length < 2) return;

  try {
    const res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix=${query}`, {
      headers: geoApiHeaders
    });
    const data = await res.json();

    data.data.forEach(city => {
      const li = document.createElement("li");
      li.textContent = `${city.city}, ${city.countryCode}`;
      li.addEventListener("click", () => {
        input.value = city.city;
        suggestions.innerHTML = "";
        checkWeather(city.city);
      });
      suggestions.appendChild(li);
    });
  } catch (err) {
    console.error("Autocomplete error:", err);
  }
});

document.addEventListener("click", e => {
  if (!e.target.closest(".autocomplete-container")) suggestions.innerHTML = "";
});

searchBtn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) checkWeather(city);
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = input.value.trim();
    if (city) checkWeather(city);
  }
});

unitBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    unitBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentUnit = btn.dataset.unit;
    checkWeather(localStorage.getItem("lastCity") || "New York");
  });
});

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
  }
  getLocation();
  setInterval(updateTime, 60000);
});
