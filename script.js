//cca63bb29b3cba9cd513f5f85d9ae66d
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const date = document.querySelector(".date");
const city = document.querySelector(".city");
const icon = document.querySelector(".icon");
const iconDescription = document.querySelector(".iconDescription");
const temp = document.querySelector(".temp");
const tempMax = document.querySelector(".tempMax");
const tempMin = document.querySelector(".tempMin");
let cityName = input.value;

let allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dateObj = new Date();

let day = dateObj.getDate();
let month = allMonths[dateObj.getMonth()];
let year = dateObj.getFullYear();

date.innerHTML = `${month} ${day}, ${year}`;

async function getWeather() {
  try {
    const input = document.querySelector(".input");
    cityName = input.value;
    const weatherDataFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cca63bb29b3cba9cd513f5f85d9ae66d&units=metric`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const weatherData = await weatherDataFetch.json();
    console.log(weatherData);
    cityName = input.value;
    city.innerHTML = weatherData.name;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="${weatherData.weather[0].description}">`;
    console.log(weatherData);
    iconDescription.innerHTML = weatherData.weather[0].description;
    temp.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
    tempMax.innerHTML = `${weatherData.main.temp_max}°C`;
    tempMin.innerHTML = `${weatherData.main.temp_min}°C`;
  } catch (error) {
    console.log(error);
  }

  if (cityName === "") {
    city.innerHTML = "Please enter a city name";
    icon.innerHTML = "";
    iconDescription.innerHTML = "";
    temp.innerHTML = "";
    tempMax.innerHTML = "";
    tempMin.innerHTML = "";
  }

  if (cityName !== "" && city.innerHTML === "undefined") {
    city.innerHTML = "City not found";
    icon.innerHTML = "";
    iconDescription.innerHTML = "";
    temp.innerHTML = "";
    tempMax.innerHTML = "";
    tempMin.innerHTML = "";
  }
}
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btn.click();
  }
});

btn.addEventListener("click", async function () {
  temp.innerHTML = "Loading...";
  await getWeather();
  input.value = "";
});
