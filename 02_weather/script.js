document.addEventListener("DOMContentLoaded", () => {
  const cityinput = document.getElementById("city-input");
  const clickbutton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const error = document.getElementById("error-message");
  const API_KEY = "052f180d00a123c00ae17f046ccca063"; //env variables

  clickbutton.addEventListener("click", async () => {
    const city = cityinput.value.trim();
    if (city === "") return;

    //it may throw some error
    //server or database is another world

    try {
      const weatherData = await fetchdata(city);
      displayweatherdata(weatherData);
    } catch (error) {
      showerror();
    }
  });

  async function fetchdata(city) {
    //get the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log(response);
    if (!response.ok) {
      throw new error("city not found");
    }

    const data = await response.json();
    return data;
  }
  function displayweatherdata(data) {
    console.log(data);
    const { name, main, weather, wind } = data;
    cityNameDisplay.textContent = name;
    //unlock the display
    weatherInfo.classList.remove("hidden");
    error.classList.add("hidden");
    temperatureDisplay.textContent = `Temperature:${main.temp}`;
    descriptionDisplay.textContent = `Weather :${weather[0].description} ,Wind speed:${wind.speed}`;
  }

  function showerror() {
    //show error
    weatherInfo.classList.add("hidden");
    error.classList.remove("hidden");
  }
});
