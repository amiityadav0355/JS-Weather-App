const API_KEY = "a2543287cb1742e4a36105213250703";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

document.body.style.background = "url('./images/default.jpg') no-repeat center center fixed";
document.body.style.backgroundSize = "cover";

async function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=yes`);
        if (!response.ok) {
            throw new Error("Invalid city name or API key.");
        }

        const data = await response.json();
        if (!data.location || !data.current) {
            throw new Error("Weather data not available.");
        }

        const location = data.location.name;
        const country = data.location.country;
        const tempC = data.current.temp_c;
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_kph;
        const condition = data.current.condition.text.toLowerCase(); 
        const icon = `https:${data.current.condition.icon}`;

        document.getElementById("city-name").textContent = `${location}, ${country}`;
        document.getElementById("temperature").textContent = `Temperature: ${tempC}°C`;
        document.getElementById("description").textContent = `Weather: ${condition}`;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} km/h`;
        document.getElementById("weather-icon").src = icon;
        document.getElementById("weather-icon").alt = condition;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorMessage.textContent = "City not found or API issue. Please try again.";
        errorMessage.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
}
