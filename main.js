// API SETTINGS
const apiKey = "d3df378e3ef7234074cccef6c9f25211";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

//DOM Elements
const inputBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    weatherIcon.src = `assets/${data.weather[0].main.toLowerCase()}.png`;
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  let city = inputBox.value;
  checkWeather(city);
});
