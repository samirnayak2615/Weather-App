function getWeather() {
    const apiKey = '79509c1ba0b5fba2815de02ad1b91e2a';
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('City not found!');
        return;
    }

    const weatherContainer = document.querySelector('.weather-container');
    const weatherHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    const weatherInfo = document.querySelector('.weather-info');
    if (weatherInfo) {
        weatherInfo.innerHTML = weatherHTML;
    } else {
        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'weather-info';
        weatherDiv.innerHTML = weatherHTML;
        weatherContainer.appendChild(weatherDiv);
    }

    // Handle weather images based on conditions
    const weatherCondition = data.weather[0].main.toLowerCase(); 
    const weatherImage = document.getElementById('image');

    if (weatherCondition.includes('clear')) {
        weatherImage.src = 'vecteezy_weather-sky-cloud-3d-render-icon_34923164.png';
    } else if (weatherCondition.includes('rain')) {
        weatherImage.src = 'vecteezy_rain-clouds-storm_35517649.png'; 
    } else if (weatherCondition.includes('cloud')) {
        weatherImage.src = 'vecteezy_3d-weather-icon-day_24825180.png'; 
    } else {
        weatherImage.src = 'vecteezy_3d-weather-icon-sun-and-wind_24825155.png'; 
    }
    
    weatherImage.style.display = 'block'; // Make the image visible
}
