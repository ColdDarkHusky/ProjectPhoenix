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

    // Function to toggle the mobile menu
    function toggleMobileMenu() {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
    }

    // Event listener for the mobile menu toggle
    document.addEventListener('DOMContentLoaded', (event) => {
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }
    });

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    }

    // Event listener for form submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Add any other JavaScript functionality you need here

    // Animate the header text
    anime({
        targets: 'header h1',
        opacity: [0, 1],
        translateY: ['-1em', 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 500
    });

    // Animate the cards
    anime({
        targets: '.card',
        opacity: [0, 1],
        translateY: [50, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: anime.stagger(100, {start: 1000})
    });

    const audioPlayer = document.getElementById('audio-player');
    const songList = document.getElementById('song-list');
    const nowPlaying = document.getElementById('now-playing');

    if (songList) {
        songList.addEventListener('click', (event) => {
            if (event.target.classList.contains('song-button')) {
                const song = event.target.dataset.song;
                const songName = event.target.textContent.trim();
                
                audioPlayer.src = `audio/${song}`;
                audioPlayer.play();
                
                nowPlaying.textContent = `Now playing: ${songName}`;
            }
        });
    }

    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.style.transform = 'scale(0.8)');
    document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');
});