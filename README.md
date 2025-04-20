# Overview
This weather app allows users to search for weather information for various cities. The frontend is a Next.js application that makes requests to the Laravel API, which fetches data from OpenWeatherMap. The app displays the current weather, forecasts for the upcoming days, and additional information such as wind speed and humidity.

The frontend communicates with the backend through AJAX requests to retrieve the weather data and display it in a visually appealing manner.

# Frontend Requirements
Framework: Next.js

Language: TypeScript

Styling: Tailwind CSS, RippleUI components

AJAX Requests: JS Fetch API to communicate with the backend API

Weather Data Source: OpenWeatherMap API

# Frontend Features:
Responsive design with Tailwind CSS

Components styled with RippleUI components

Fetches weather data dynamically using AJAX calls

Displays the current weather, forecast, wind speed, and humidity

# Backend Requirements
Framework: Laravel (latest version)

API: Only implement the backend API. No blade views are needed.

API Client: Use any HTTP client for making requests (e.g., Guzzle, HTTP client from Laravel)

Weather Data Source: OpenWeatherMap API

Security: Open access API (no authentication or security needed for this demo)

## Backend Features:
Fetches weather data using the OpenWeatherMap API

Returns weather data in a structured format (JSON)

Provides weather data for current weather and forecasts for the next 3 days

# Demo
You can view the live demo of this weather app here: [Demo URL]

## Contributing
Fork this repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit them (git commit -am 'Add feature').

Push to the branch (git push origin feature-name).

Create a new Pull Request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.