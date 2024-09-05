document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    const loadingMessage = document.getElementById('loading-message');

    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

    const displayWeather = (data) => {
        const cityName = document.getElementById('city-name');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');
        const feelsLike = document.getElementById('feels-like');
        const weatherIcon = document.getElementById('weather-icon');

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
        description.textContent = `Description: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        feelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273.15)}°C`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        weatherInfo.style.display = 'block';
        errorMessage.style.display = 'none';
        loadingMessage.style.display = 'none';
    };

    const displayError = (message) => {
        const errorText = document.getElementById('error-text');
        errorText.textContent = message;
        weatherInfo.style.display = 'none';
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
    };

    const showLoading = () => {
        weatherInfo.style.display = 'none';
        errorMessage.style.display = 'none';
        loadingMessage.style.display = 'block';
    };

    const fetchWeather = async (city) => {
        showLoading();
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            displayError(error.message);
        }
    };

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            displayError('Please enter a city name');
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});