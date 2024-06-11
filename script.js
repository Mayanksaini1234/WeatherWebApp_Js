const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const Desrciption = document.querySelector('#data');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function getWeather(city) {
    const api_key = "3b40b0d05510f90747d82a11c4f47580";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weatherData = await fetch(`${url}`).then((res) => {
        return res.json();
    })

    if (weatherData.cod == "404") {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";


    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
wind_speed.innerHTML= weatherData.wind.speed+"Km/H";
humidity.innerHTML= weatherData.main.humidity+"%";


    switch (weatherData.weather[0].main) {
        case "Clouds":
            weather_img.src = "assets/cloud.png";
            break;
        case "Clear":
            weather_img.src = "assets/clear.png";
            break;
        case "Haze":
            weather_img.src = "assets/mist.png";
            break;
        case "Rain":
            weather_img.src = "assets/rain.png";
            break;
        case "Snow":
            weather_img.src = "assets/snow.png";
            break;
        default:
            // You can add a default case to handle unexpected values
            weather_img.src = "assets/default.png";
            break;
    }
    


    Desrciption.innerHTML =weatherData.weather[0].description;

    console.log(weatherData)


}



searchBtn.addEventListener("click", () => {
    getWeather(inputBox.value);
})