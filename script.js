document.addEventListener('DOMContentLoaded', () => {
    // Quote of the Day functionality
    const quotePage = document.getElementById('quote');
    if (quotePage) {
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        const newQuoteButton = document.getElementById('new-quote');

        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
            { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
        ];

        function displayRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteText.textContent = `"${randomQuote.text}"`;
            quoteAuthor.textContent = `- ${randomQuote.author}`;
        }

        newQuoteButton.addEventListener('click', displayRandomQuote);

        // Display initial quote
        displayRandomQuote();
    }

    // Weather functionality
    const weatherSection = document.getElementById('weather');
    if (weatherSection) {
        const cityInput = document.getElementById('city-input');
        const getWeatherButton = document.getElementById('get-weather');
        const weatherData = document.getElementById('weather-data');

        getWeatherButton.addEventListener('click', () => {
            const city = cityInput.value;
            if (city) {
                fetchWeather(city);
            }
        });

        async function fetchWeather(city) {
            const apiKey = '3bab25ff9ef2f6bf9d57a7a8f07d0993';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod === 200) {
                    const weather = data.weather[0].description;
                    const temp = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;

                    weatherData.innerHTML = `
                        <h3>${data.name}, ${data.sys.country}</h3>
                        <p>Weather: ${weather}</p>
                        <p>Temperature: ${temp}°C</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;
                } else {
                    weatherData.innerHTML = `<p>City not found. Please try again.</p>`;
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                weatherData.innerHTML = `<p>An error occurred. Please try again later.</p>`;
            }
        }
    }

    function updateLocalTime() {
        const timeElement = document.getElementById('local-time');
        if (timeElement) {
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const localTime = new Date().toLocaleTimeString('en-US', options);
            timeElement.textContent = `Local Time: ${localTime}`;
        }
    }

    // Update time every second
    setInterval(updateLocalTime, 1000);

    // Initial call to display time immediately
    updateLocalTime();
});
